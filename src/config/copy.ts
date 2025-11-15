// src/config/copy.ts
import { PERSON } from './personalization'

type SectionCopy = {
  title: string
  paragraphs: string[]
}

type FinaleCopy = {
  title: string
  description: string
}

export const COPY: {
  romantic: SectionCopy
  reflection: SectionCopy
  finale: FinaleCopy
} = {
  romantic: {
    title: `For you, ${PERSON.nickname}`,
    paragraphs: [
      `Hari ini bukan cuma tentang bertambahnya usia kamu, tapi juga tentang betapa bersyukurnya aku karena bisa kenal ${PERSON.relationship}.`,
      `Aku memang nggak selalu bisa ngasih hal besar, tapi aku pengin kamu lihat bahwa aku benar-benar berusaha: pelan-pelan belajar, pelan-pelan jadi versi diriku yang lebih pantas untuk kamu.`,
      `Ada banyak hal yang aku suka dari kamu: ${PERSON.specialTraits[0]}, ${PERSON.specialTraits[1]}, dan ${PERSON.specialTraits[2]}. Semua itu bikin aku merasa sangat beruntung bisa jalan bareng kamu sejauh ini.`,
    ],
  },

  reflection: {
    title: 'Looking back, looking forward',
    paragraphs: [
      'Kita sudah lewat hari-hari yang santai, hari-hari yang berat, hari-hari yang absurd — tapi di ujungnya, kamu tetap orang pertama yang ingin aku ajak cerita.',
      'Aku nggak janji semuanya akan selalu mudah, tapi aku janji satu hal: aku akan terus belajar, memperbaiki diri, dan berusaha jadi orang yang kamu bisa andalkan, bukan cuma di hari-hari baik, tapi juga di hari-hari yang kacau.',
      'Semoga ke depan, kita bisa punya lebih banyak momen bareng — entah itu hal besar seperti perjalanan jauh, atau hal kecil seperti ngobrol random sebelum tidur yang ternyata berarti banget.',
    ],
  },

  finale: {
    title: `Make a wish, ${PERSON.nickname}`,
    description:
      'Take a deep breath, make a wish in your heart, and when you are ready… blow the candle by tapping the cake.',
  },
}
