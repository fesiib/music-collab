/*
comments: [
    {
        author: "",
        comment: "",
        timeStamp: 0,
        votes: 0,
        replies: [
            {
                author: "",
                comment: "",
                timeStamp: 0,
                votes: 0,
            },
        ] ,
        
    }
]
*/

import namor from 'namor'

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

function randomDate() {
    const start = new Date(2021, 10, 1);
    const end = new Date(2021, 10, 11);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const newComment = () => {
  return {
    id: Math.floor(Math.random() * 1240),
    author: namor.generate({ words: 1, numbers: 0 }),
    contend: namor.generate({ words: 1, numbers: 0 }) + " " + namor.generate({ words: 1, numbers: 0 })+ " " + namor.generate({ words: 1, numbers: 0 })+ " " + namor.generate({ words: 1, numbers: 0 })+ " " + namor.generate({ words: 1, numbers: 0 })+ " " + namor.generate({ words: 1, numbers: 0 })+ " " + namor.generate({ words: 1, numbers: 0 }),
    timeStamp: randomDate(),
    votes: Math.floor(Math.random() * 30),
  }
}




const commentsGen = (len) => {
    return range(len).map(d => {
        return {
            ...newComment(),
            replies:   range( Math.floor(Math.random() * 3) ).map(d => newComment()),
        };
        
    })
}



export default commentsGen;