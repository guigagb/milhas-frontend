export const mesesNome = state => state.meses.map(ln => { return { text: ln.nome, value: ln.value } })
export const mesesAbrev = state => state.meses