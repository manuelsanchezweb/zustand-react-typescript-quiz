export const getFinalResultByScore = (score: number) => {
  if (score < 3) {
    return `¿Tú no has venido mucho por el pueblo, no? ¡Con esos ${score} puntos que has tenido no sé a quién vas a convencer!`
  } else if (score < 5) {
    return `A ver, con estos ${score} puntos se nota que has venido un par de veces al pueblo y tal, pero tú muy melicener@ no eres en verdad.`
  } else if (score < 8) {
    return `¡Nada mal! ¡${score} puntazos! ¡Te has quedado cerquita de alcanzar la perfección melicenera!`
  } else {
    return `¡No hay nadie más melicener@ que tú! ¡Has tenido las ${score} preguntas bien!`
  }
}
