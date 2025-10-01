<template>
  <section class="chellenge-steps-wrap">
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      class="challenge-canvas"
      @click="handleCanvasClick"
      @mousemove="handleCanvasMouseMove"
    ></canvas>
    <div class="steps-info">
      <div class="date"><strong>8</strong>일</div>
      <div class="total-steps">
        <strong>{{ currentSteps.toLocaleString() }}</strong
        >걸음
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const emit = defineEmits<{
  milestoneClick: [milestone: { steps: number; label: string; index: number }]
}>()

const canvasRef = ref<HTMLCanvasElement>()
const canvasWidth = ref(335)
const canvasHeight = ref(430)
let baseWidth = 335
let baseHeight = 430

const currentSteps = ref(350001) // 현재 걸음 수 (예시)
const totalSteps = 500000
const totalDays = 40

// 클릭 가능한 gift 마일스톤 영역
const milestoneAreas = ref<
  Array<{
    x: number
    y: number
    radius: number
    milestone: any
    index: number
    isPassed: boolean
  }>
>([])

// 이미지들
const loadedImages = ref<{ [key: string]: HTMLImageElement }>({})

// 애니메이션
const profileAnimationScale = ref(0)
const isAnimating = ref(false)
const completedMilestones = ref<Set<number>>(new Set())
const animatingMilestones = ref<Map<number, { startTime: number; scale: number; opacity: number; offsetY: number }>>(
  new Map()
)

// 각 마일스톤 이미지
import imgPointBlue from '~/assets/images/walkingKing/img-walkking-point-blue.svg'
import imgPointYellow from '~/assets/images/walkingKing/img-walkking-point-yellow.svg'
import imgPointStart from '~/assets/images/walkingKing/img-walkking-point-start.svg'
import imgPointGoal from '~/assets/images/walkingKing/img-walkking-point-goal.svg'
import imgPointGift from '~/assets/images/walkingKing/img-walkking-point-gift.svg'
import imgPointComplete from '~/assets/images/walkingKing/img-walkking-point-complete.svg'
import profileImg from '~/assets/images/community/img-rank-profile.png'

const milestoneImages = [
  imgPointStart, // 출발
  imgPointBlue, // 7만보
  imgPointYellow, // 15만보
  imgPointBlue, // 25만보
  imgPointYellow, // 35만보
  imgPointBlue, // 45만보
  imgPointGoal // 골
]

// 공용: 이미지 로드
const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

const preloadImages = async () => {
  try {
    loadedImages.value['milestone_blue'] = await loadImage(imgPointBlue)
    loadedImages.value['milestone_gift'] = await loadImage(imgPointGift)
    loadedImages.value['milestone_complete'] = await loadImage(imgPointComplete)
    loadedImages.value['profile'] = await loadImage(profileImg)
  } catch (e) {
    console.error('Image preload error', e)
  }

  for (let i = 0; i < milestoneImages.length; i++) {
    const imageSrc = milestoneImages[i]
    if (!imageSrc) continue
    try {
      loadedImages.value[`milestone_${i}`] = await loadImage(imageSrc)
    } catch (e) {
      console.error(`Failed to load image for milestone ${i}:`, e)
    }
  }
  drawChallengePath()
}

const progressPercent = computed(() => Math.round((currentSteps.value / totalSteps) * 100))

// 마일스톤 좌표(고정 베이스 → 캔버스 스케일 반영)
const getMilestones = () => {
  const scaleX = canvasWidth.value / baseWidth
  const scaleY = canvasHeight.value / baseHeight
  const centerX = 167.5 // 335/2
  const centerOffset = 0

  const milestones = [
    { steps: 0, label: '출발', x: 207, y: 385 },
    { steps: 70000, label: '7만보', x: 40, y: 340 },
    { steps: 150000, label: '15만보', x: 295, y: 285 },
    { steps: 250000, label: '25만보', x: 40, y: 230 },
    { steps: 350000, label: '35만보', x: 295, y: 175 },
    { steps: 450000, label: '45만보', x: 40, y: 120 },
    { steps: 500000, label: '골!', x: 166, y: 70 }
  ]

  return milestones.map(m => ({
    ...m,
    x: m.x < centerX ? (m.x + centerOffset) * scaleX : (m.x - centerOffset) * scaleX,
    y: m.y * scaleY
  }))
}

// 진행 위치 (세그먼트 내 보간 + Y offset 적용)
const getPositionAtSteps = (steps: number) => {
  const milestones = getMilestones()
  if (steps >= totalSteps) {
    const goal = milestones[milestones.length - 1]
    return { x: goal.x, y: goal.y }
  }
  for (let i = 1; i < milestones.length; i++) {
    const prev = milestones[i - 1]
    const curr = milestones[i]
    if (steps >= prev.steps && steps <= curr.steps) {
      const segmentIndex = i - 1 // 현재 구간 인덱스

      // 각 구간별 Y offset 값 (drawChallengePath와 동일하게 적용)
      let startYOffset = 0
      let endYOffset = 0

      if (segmentIndex === 0) {
        startYOffset = 5
        endYOffset = 12
      } else if (segmentIndex === 1) {
        startYOffset = -12
        endYOffset = 12
      } else if (segmentIndex === 2) {
        startYOffset = -12
        endYOffset = 12
      } else if (segmentIndex === 3) {
        startYOffset = -12
        endYOffset = 12
      } else if (segmentIndex === 4) {
        startYOffset = -12
        endYOffset = 13
      } else if (segmentIndex === 5) {
        startYOffset = -15
        endYOffset = 0
      }

      const t = (steps - prev.steps) / (curr.steps - prev.steps)
      const dx = curr.x - prev.x
      const dy = curr.y - prev.y
      const dist = Math.hypot(dx, dy)
      const ux = dx / (dist || 1)
      const uy = dy / (dist || 1)
      const offset = 10
      const sx = prev.x + ux * offset
      const sy = prev.y + uy * offset + startYOffset
      const ex = curr.x - ux * offset
      const ey = curr.y - uy * offset + endYOffset

      // Y offset을 보간하여 적용
      const currentYOffset = startYOffset + (endYOffset - startYOffset) * t
      return { x: sx + (ex - sx) * t, y: sy + (ey - sy) * t }
    }
  }
  return { x: milestones[0].x, y: milestones[0].y }
}

// 프로필 등장 애니메이션
const startProfileAnimation = () => {
  const duration = 500
  const startTime = Date.now()
  isAnimating.value = true
  const loop = () => {
    const p = Math.min((Date.now() - startTime) / duration, 1)
    const bounce = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
    profileAnimationScale.value = bounce
    drawChallengePath()
    if (p < 1) requestAnimationFrame(loop)
    else isAnimating.value = false
  }
  requestAnimationFrame(loop)
}

// Gift 스케일/페이드
const startScaleAnimation = () => {
  const loop = () => {
    let has = false
    const now = Date.now()
    for (const [, anim] of animatingMilestones.value.entries()) {
      const t = Math.min((now - anim.startTime) / 300, 1)
      if (t <= 0.5) {
        const k = t / 0.5
        anim.scale = 1 + k * 0.5
        anim.opacity = 1
        anim.offsetY = 0
      } else {
        const k = (t - 0.5) / 0.5
        anim.scale = 1.5 - k * 0.3
        anim.opacity = 1 - k
        anim.offsetY = -k * 20
      }
      has = true
    }
    drawChallengePath()
    if (has) requestAnimationFrame(loop)
  }
  requestAnimationFrame(loop)
}

/** ─────────────────────────────────────────────────
 *  코너가 둥근 폴리라인 path 빌더 (quadraticCurveTo)
 *  - cornerRadius: 코너 둥글림 정도
 *  - nodeRadius:   각 노드(마일스톤) 가장자리까지 띄우는 오프셋
 *  ───────────────────────────────────────────────── */
function traceRoundedPath(
  ctx: CanvasRenderingContext2D,
  points: Array<{ x: number; y: number }>,
  cornerRadius: number,
  nodeRadius: number
) {
  if (points.length < 2) return

  const p0 = points[0],
    p1 = points[1]
  const v0x = p1.x - p0.x,
    v0y = p1.y - p0.y
  const v0d = Math.hypot(v0x, v0y) || 1
  const start = { x: p0.x + (v0x / v0d) * nodeRadius, y: p0.y + (v0y / v0d) * nodeRadius }

  ctx.beginPath()
  ctx.moveTo(start.x, start.y)

  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1],
      b = points[i],
      c = points[i + 1]

    const abx = b.x - a.x,
      aby = b.y - a.y
    const bcx = c.x - b.x,
      bcy = c.y - b.y
    const abd = Math.hypot(abx, aby) || 1
    const bcd = Math.hypot(bcx, bcy) || 1

    const uabx = abx / abd,
      uaby = aby / abd
    const ubcx = bcx / bcd,
      ubcy = bcy / bcd

    const maxEnter = Math.max(0, Math.min(cornerRadius, abd / 2 - 1))
    const maxExit = Math.max(0, Math.min(cornerRadius, bcd / 2 - 1))

    const enter = { x: b.x - uabx * maxEnter, y: b.y - uaby * maxEnter }
    const exit = { x: b.x + ubcx * maxExit, y: b.y + ubcy * maxExit }

    ctx.lineTo(enter.x, enter.y)
    ctx.quadraticCurveTo(b.x, b.y, exit.x, exit.y)
  }

  const pn_1 = points[points.length - 2]
  const pn = points[points.length - 1]
  const vnx = pn.x - pn_1.x,
    vny = pn.y - pn_1.y
  const vnd = Math.hypot(vnx, vny) || 1
  const end = { x: pn.x - (vnx / vnd) * nodeRadius, y: pn.y - (vny / vnd) * nodeRadius }

  ctx.lineTo(end.x, end.y)
}

// 메인 렌더
function drawRoundedPolyline(ctx: CanvasRenderingContext2D, points: Array<{ x: number; y: number }>, r: number) {
  if (points.length < 2) return
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i]
    const n = points[i + 1]
    ctx.lineTo(p.x, p.y)
    ctx.arcTo(p.x, p.y, n.x, n.y, r)
  }
  const last = points[points.length - 1]
  ctx.lineTo(last.x, last.y)
}

const drawChallengePath = () => {
  if (!canvasRef.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvasWidth.value, canvasHeight.value)

  const milestones = getMilestones()

  // 라인 공통 스타일
  ctx.lineWidth = 10
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // 노드 반지름 (가장 큰 아이콘 기준)
  const normalRadius = 17
  const giftRadius = 24 // 48px / 2
  const nodeRadius = Math.max(normalRadius, giftRadius)
  const cornerRadius = 3000 // 코너 둥글림 강도 (원하는 대로 조정)

  // 1) 각 구간을 개별 path로 그리기 (Y offset 적용)
  const effective = Math.min(currentSteps.value, totalSteps)
  const segmentYOffset = 5 // 각 구간별 Y 오프셋

  // 각 구간별로 선 그리기
  for (let i = 0; i < milestones.length - 1; i++) {
    const startMilestone = milestones[i]
    const endMilestone = milestones[i + 1]

    // 현재 구간이 진행되었는지 확인
    const segmentStartSteps = startMilestone.steps
    const segmentEndSteps = endMilestone.steps

    // 각 라인별 시작점과 끝점에 다른 Y offset 적용
    let startYOffset = 0
    let endYOffset = 0

    // 구간별 개별 조정
    if (i === 0) {
      // 구간 0 : 기본값 유지
      startYOffset = 5
      endYOffset = 12
    } else if (i === 1) {
      // 구간 1 : 왼쪽(시작)
      startYOffset = -12
      endYOffset = 12
    } else if (i === 2) {
      // 구간 2 : 왼쪽(시작)
      startYOffset = -12
      endYOffset = 12
    } else if (i === 3) {
      // 구간 3 : 왼쪽(시작)
      startYOffset = -12
      endYOffset = 12
    } else if (i === 4) {
      // 구간 4: 왼쪽(시작)
      startYOffset = -12
      endYOffset = 13
    } else if (i === 5) {
      // 구간 5 : 왼쪽(시작)
      startYOffset = -15
      endYOffset = 0
    }

    const offsetStart = {
      x: startMilestone.x,
      y: startMilestone.y + startYOffset,
      steps: startMilestone.steps,
      label: startMilestone.label
    }
    const offsetEnd = {
      x: endMilestone.x,
      y: endMilestone.y + endYOffset,
      steps: endMilestone.steps,
      label: endMilestone.label
    }

    // 구간별 진행 상태 판단
    if (effective <= segmentStartSteps) {
      // 아직 도달하지 않은 구간 - 흰색으로 그리기
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 10
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      drawRoundedPolyline(ctx, [offsetStart, offsetEnd], 80)
      ctx.stroke()
    } else if (effective >= segmentEndSteps) {
      // 완전히 지나간 구간 - 파란색
      ctx.strokeStyle = '#4C7FF7'
      ctx.lineWidth = 10
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      drawRoundedPolyline(ctx, [offsetStart, offsetEnd], 80)
      ctx.stroke()
    } else {
      // 현재 진행 중인 구간 - 먼저 전체를 흰색으로 그리고
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.lineWidth = 10
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      drawRoundedPolyline(ctx, [offsetStart, offsetEnd], 80)
      ctx.stroke()

      // 진행된 부분만 파란색으로 덮어쓰기
      ctx.strokeStyle = '#4C7FF7'
      const t = (effective - segmentStartSteps) / (segmentEndSteps - segmentStartSteps)
      const progressEnd = {
        x: offsetStart.x + (offsetEnd.x - offsetStart.x) * t,
        y: offsetStart.y + (offsetEnd.y - offsetStart.y) * t
      }
      drawRoundedPolyline(ctx, [offsetStart, progressEnd], 80)
      ctx.stroke()
    }
  }

  // 3) 클릭 영역 초기화
  milestoneAreas.value = []

  // 4) 마일스톤 아이콘/라벨 렌더
  milestones.forEach((milestone, index) => {
    const isStart = index === 0
    const isGoal = index === milestones.length - 1
    const effective = Math.min(currentSteps.value, totalSteps)
    const isPassed = effective > milestone.steps
    const isCompleted = completedMilestones.value.has(index)
    const shouldUseGift = isPassed && !isStart && !isGoal && !isCompleted
    const shouldUseComplete = isCompleted && !isStart && !isGoal

    let imageKey: string
    if (shouldUseComplete) imageKey = 'milestone_complete'
    else if (shouldUseGift) imageKey = 'milestone_gift'
    else imageKey = `milestone_${index}`

    const hasImage = loadedImages.value[imageKey] || loadedImages.value[`milestone_${index}`]

    // gift 클릭 가능 영역 저장
    if (shouldUseGift) {
      milestoneAreas.value.push({
        x: milestone.x,
        y: milestone.y,
        radius: 24,
        milestone,
        index,
        isPassed
      })
    }

    if (hasImage) {
      const basePointSize = 34
      const baseCircleRadius = 17

      if (isGoal) {
        // 파란 포인트 베이스
        ctx.save()
        ctx.beginPath()
        ctx.arc(milestone.x, milestone.y, baseCircleRadius, 0, Math.PI * 2)
        ctx.clip()
        if (loadedImages.value['milestone_blue']) {
          ctx.drawImage(
            loadedImages.value['milestone_blue'],
            milestone.x - baseCircleRadius,
            milestone.y - baseCircleRadius,
            baseCircleRadius * 2,
            baseCircleRadius * 2
          )
        }
        ctx.restore()

        // 테두리
        ctx.beginPath()
        ctx.arc(milestone.x, milestone.y, baseCircleRadius, 0, Math.PI * 2)
        ctx.strokeStyle = isPassed ? '#4C7FF7' : '#E0E0E0'
        ctx.lineWidth = 3
        ctx.stroke()

        // 골 이미지
        const goalSize = 33
        const goalOffset = 48
        ctx.drawImage(
          loadedImages.value[imageKey],
          milestone.x - goalSize / 4,
          milestone.y - goalOffset,
          goalSize,
          goalSize
        )
      } else {
        if (shouldUseComplete) {
          // 완료 아이콘(32x32)
          const w = 32,
            h = 32
          ctx.drawImage(loadedImages.value['milestone_complete'], milestone.x - w / 2, milestone.y - h / 2, w, h)

          // 애니메이션 중이면 gift 오버레이
          const anim = animatingMilestones.value.get(index)
          if (anim) {
            const gw = 48,
              gh = 48
            ctx.save()
            ctx.globalAlpha = anim.opacity
            const sw = gw * anim.scale
            const sh = gh * anim.scale
            const y = milestone.y + anim.offsetY
            ctx.drawImage(loadedImages.value['milestone_gift'], milestone.x - sw / 2, y - sh / 2, sw, sh)
            ctx.restore()
          }
        } else if (shouldUseGift) {
          // gift (48x48)
          const gw = 48,
            gh = 48
          ctx.drawImage(loadedImages.value[imageKey], milestone.x - gw / 2, milestone.y - gh / 2, gw, gh)
        } else {
          // 일반 포인트
          const w = isStart ? 51 : basePointSize
          const h = isStart ? 29 : basePointSize
          ctx.save()
          if (!isStart) {
            ctx.beginPath()
            ctx.arc(milestone.x, milestone.y, w / 2, 0, Math.PI * 2)
            ctx.clip()
          }
          ctx.drawImage(loadedImages.value[imageKey], milestone.x - w / 2, milestone.y - h / 2, w, h)
          ctx.restore()

          if (!isStart) {
            ctx.beginPath()
            ctx.arc(milestone.x, milestone.y, w / 2, 0, Math.PI * 2)
            ctx.strokeStyle = isPassed ? '#4C7FF7' : '#E0E0E0'
            ctx.lineWidth = 3
            ctx.stroke()
          }
        }
      }
    } else {
      // fallback 원
      const r = 12
      ctx.beginPath()
      ctx.arc(milestone.x, milestone.y, r, 0, Math.PI * 2)
      ctx.fillStyle = isPassed ? '#4C7FF7' : '#FFFFFF'
      ctx.fill()
      ctx.strokeStyle = isPassed ? '#4C7FF7' : '#E0E0E0'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // 라벨 (출발 제외)
    if (index !== 0) {
      ctx.font = '700 13px sans-serif'
      ctx.fillStyle = '#555'
      const days = Math.ceil(milestone.steps / (totalSteps / totalDays))
      const labelText = `${milestone.steps.toLocaleString()}걸음 / ${days}일`

      // 각 라벨별 X, Y offset 개별 설정
      let labelXOffset = 0 // 기본 X offset
      let labelYOffset = 5 // 기본 Y offset
      let textAlign: CanvasTextAlign = 'center'

      if (index === 1) {
        // 7만보 라벨
        labelXOffset = -35 // 오른쪽으로
        labelYOffset = 25 + 5
        textAlign = 'left'
      } else if (index === 2) {
        // 15만보 라벨
        labelXOffset = 35 // 왼쪽으로
        labelYOffset = 25 + 5
        textAlign = 'right'
      } else if (index === 3) {
        // 25만보 라벨
        labelXOffset = -35 // 오른쪽으로
        labelYOffset = 25 + 5
        textAlign = 'left'
      } else if (index === 4) {
        // 35만보 라벨
        labelXOffset = 35 // 왼쪽으로
        labelYOffset = 25 + 5
        textAlign = 'right'
      } else if (index === 5) {
        // 45만보 라벨
        labelXOffset = -35 // 오른쪽으로
        labelYOffset = 28 + 5
        textAlign = 'left'
      } else if (index === 6) {
        // 골 라벨
        labelXOffset = 0 // 가운데
        labelYOffset = 28 + 5
        textAlign = 'center'
      }

      ctx.textAlign = textAlign

      // 흰색 text-shadow 효과 (먼저 흰색 외곽선 그리기)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
      ctx.lineWidth = 2
      ctx.lineJoin = 'round'
      ctx.miterLimit = 2
      ctx.strokeText(labelText, milestone.x + labelXOffset, milestone.y + labelYOffset)

      // 실제 텍스트 그리기
      ctx.fillText(labelText, milestone.x + labelXOffset, milestone.y + labelYOffset)
    }
  })

  // 5) 현재 위치 마커(프로필)
  const pos = getPositionAtSteps(currentSteps.value)
  if (profileAnimationScale.value > 0) {
    const markerSize = 17 * profileAnimationScale.value
    const profileSize = 30 * profileAnimationScale.value

    // 배경 원
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, markerSize, 0, Math.PI * 2)
    ctx.fillStyle = '#4C7FF7'
    ctx.fill()
    ctx.strokeStyle = '#FFFFFF'
    ctx.lineWidth = 2
    ctx.stroke()

    // 프로필 이미지
    if (loadedImages.value['profile'] && profileSize > 0) {
      ctx.save()
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, profileSize / 2, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(
        loadedImages.value['profile'],
        pos.x - profileSize / 2,
        pos.y - profileSize / 2,
        profileSize,
        profileSize
      )
      ctx.restore()
    }
  }
}

// 이벤트 핸들러
const handleCanvasClick = (event: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY

  for (const area of milestoneAreas.value) {
    const d = Math.hypot(x - area.x, y - area.y)
    if (d <= area.radius) {
      if (!completedMilestones.value.has(area.index) && !animatingMilestones.value.has(area.index)) {
        completedMilestones.value.add(area.index)
        animatingMilestones.value.set(area.index, { startTime: Date.now(), scale: 1, opacity: 1, offsetY: 0 })
        emit('milestoneClick', { steps: area.milestone.steps, label: area.milestone.label, index: area.index })
        setTimeout(() => {
          animatingMilestones.value.delete(area.index)
          drawChallengePath()
        }, 300)
        startScaleAnimation()
      }
      break
    }
  }
}

const handleCanvasMouseMove = (event: MouseEvent) => {
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const scaleX = canvasWidth.value / rect.width
  const scaleY = canvasHeight.value / rect.height
  const x = (event.clientX - rect.left) * scaleX
  const y = (event.clientY - rect.top) * scaleY

  let hover = false
  for (const area of milestoneAreas.value) {
    const d = Math.hypot(x - area.x, y - area.y)
    if (d <= area.radius && !completedMilestones.value.has(area.index) && !animatingMilestones.value.has(area.index)) {
      hover = true
      break
    }
  }
  canvasRef.value.style.cursor = hover ? 'pointer' : 'default'
}

const handleResize = () => {
  const container = canvasRef.value?.parentElement
  if (container) {
    const _w = container.clientWidth
    const _h = container.clientHeight
    // 고정 사이즈 유지
    baseWidth = 335
    baseHeight = 430
    canvasWidth.value = 335
    canvasHeight.value = 430
    setTimeout(() => drawChallengePath(), 0)
  }
}

onMounted(async () => {
  handleResize()
  drawChallengePath()
  window.addEventListener('resize', handleResize)
  await preloadImages()
  setTimeout(() => startProfileAnimation(), 1000)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
.chellenge-steps-wrap {
  margin: -5.6rem -2rem -2rem;
  padding: 5.6rem 2rem 3.2rem;
  height: 100vh;
  min-height: 70rem;
  background-size: 100% 100vh;
  background-position: top;
  background-repeat: no-repeat;
  background-image: url(~/assets/images/walkingKing/img-challenge-bg.png);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 375px) {
    min-height: 0;
  }

  .steps-info {
    position: fixed;
    bottom: 18.4rem;
    left: 2rem;
    font-size: 1.6rem;
    color: #2b2b2b;
    font-weight: 500;
    @media (max-width: 375px) {
      font-size: 1.4rem;
    }
    .date {
      display: flex;
      gap: 0 0.2rem;
      align-items: center;
      strong {
        font-size: 1.8rem;
        font-weight: 700;
        color: #2b2b2b;
        @media (max-width: 375px) {
          font-size: 1.6rem;
        }
      }
    }
    .total-steps {
      display: flex;
      gap: 0 0.4rem;
      align-items: center;
      strong {
        font-size: 2.8rem;
        font-weight: 700;
        color: #2b2b2b;
        @media (max-width: 375px) {
          font-size: 2.2rem;
        }
      }
    }
  }
}

.challenge-canvas {
  max-width: 100%;
  height: auto;
  position: absolute;
  top: 18%;
  @media (max-width: 375px) {
    top: 7%;
  }
  @media (max-height: 700px) {
    top: 7%;
  }
}
</style>
