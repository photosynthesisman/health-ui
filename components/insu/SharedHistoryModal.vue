<template>
  <div class="count-history">
    총&nbsp;<strong>{{ count }}</strong
    >건
  </div>
  <div class="wrap-grey">
    <SharedHistoryAccordion
      :medical-history="medicalInfos"
      :is-label-title="true"
      :is-share-date="true"
      :is-issue-date="true"
      :label-title="'의료영상 발급내역'"
    />
  </div>
</template>

<script setup lang="ts">
import SharedHistoryAccordion from '~/components/insu/SharedHistoryAccordion.vue'
const count = computed(() => medicalInfos.length)

const medicalInfos = [
  {
    id: 1,
    detailInfos: [
      {
        title: '공유한 병원',
        detail: '강동성심병원'
      },
      {
        title: '영상 공유일자',
        detail: '2025.05.24'
      },
      {
        title: '영상 공유방식',
        detail: '클라우드 전송'
      }
    ],
    departments: [
      {
        id: 10,
        department: '내과',
        examinations: [
          {
            id: 101,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 102,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    detailInfos: [
      {
        title: '공유한 병원',
        detail: '고려대학병원'
      },
      {
        title: '영상 공유일자',
        detail: '2025.05.24'
      },
      {
        title: '영상 공유방식',
        detail: '클라우드 전송'
      }
    ],
    departments: [
      {
        id: 20,
        department: '내과',
        examinations: [
          {
            id: 201,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 202,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 21,
        department: '정형외과',
        examinations: [
          {
            id: 203,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    detailInfos: [
      {
        title: '공유한 병원',
        detail: '세브란스 병원'
      },
      {
        title: '영상 공유일자',
        detail: '2025.05.24'
      },
      {
        title: '영상 공유방식',
        detail: '이메일 전송'
      },
      {
        title: '이메일 주소',
        detail: 'kimlemon12@naver.com'
      },
      { id: 303, title: '비밀번호', password: 1123123 }
    ],
    departments: [
      {
        id: 31,
        department: '내과',
        examinations: [
          {
            id: 301,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 302,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 32,
        department: '정형외과',
        examinations: [
          {
            id: 303,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    detailInfos: [
      {
        title: '공유한 병원',
        detail: '세브란스 병원'
      },
      {
        title: '영상 공유일자',
        detail: '2025.05.24'
      },
      {
        title: '영상 공유방식',
        detail: '이메일 전송'
      },
      {
        title: '이메일 주소',
        detail: 'kimlemon12@naver.com'
      },
      {
        id: 404,
        title: '비밀번호',
        password: 1123123
      }
    ],
    departments: [
      {
        id: 41,
        department: '내과',
        examinations: [
          {
            id: 401,
            name: 'CT (컴퓨터단층촬영)',
            date: '2024.11.20'
          },
          {
            id: 402,
            name: 'MRI (자기공명영상)',
            date: '2024.11.15'
          }
        ]
      },
      {
        id: 42,
        department: '정형외과',
        examinations: [
          {
            id: 403,
            name: 'X-ray (엑스레이)',
            date: '2024.11.10'
          }
        ]
      }
    ]
  }
]
</script>

<style lang="scss" scoped>
.count-history {
  padding-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  text-align: left;
}
.wrap-grey {
  flex: 1;
  position: relative;
  margin: 0 -2rem -2rem -2rem;
  padding: 2.4rem 2rem 4rem;
  background-color: #f4f4f4;
}
</style>
