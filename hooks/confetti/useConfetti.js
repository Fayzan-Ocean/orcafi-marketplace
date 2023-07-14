import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

const useConfetti = () =>{

    const buyConfetti =() =>{
        jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
     })
    }

    

     return {   buyConfetti };
    };
    

export default useConfetti;