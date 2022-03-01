function move (disk, from, to) {
  console.log(`把${disk}从${from}移动到${to}`)
}

function hanoi (n, A, B, C) {
  if (n === 1) {
    move(n, A, C)
  } else {
    hanoi(n - 1, A, C, B)
    move(n, A, C)
    hanoi(n - 1, B, A, C)
  }
}

hanoi(3, 'A', 'B', 'C')