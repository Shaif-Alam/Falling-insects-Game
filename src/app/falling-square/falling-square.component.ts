import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-falling-square',
  templateUrl: './falling-square.component.html',
  styleUrls: ['./falling-square.component.css']
})
export class FallingSquareComponent implements OnInit {
  paths = Array(6).fill(0); // 6 paths
  squares: { position: number; number: number; breaking?: boolean }[][] = Array.from({ length: 6 }, () => []); // Squares per path
  squareInterval: any;
  totalScore = 0; // Total score from clicked squares
  clickedSquares = 0; // Total number of squares clicked
  snackbarVisible = false; // Snackbar visibility
  currentRound = 1; // Current round number
  speed = 2; // Default speed for squares falling

  ngOnInit(): void {
    this.startSquareGeneration();
  }

  startSquareGeneration(): void {
    this.squareInterval = setInterval(() => {
      const randomPath = Math.floor(Math.random() * 6);
      const randomNumber = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
      this.squares[randomPath].push({ position: 0, number: randomNumber });
    }, 500); // Interval for square generation
    this.moveSquares();
  }

  moveSquares(): void {
    setInterval(() => {
      this.squares.forEach((pathSquares, pathIndex) => {
        pathSquares.forEach((square, index) => {
          if (!square.breaking) {
            square.position += this.speed; // Move square down
          }
          if (square.position > window.innerHeight - 60) {
            // Trigger breaking animation
            this.triggerBreaking(pathIndex, square);
          }
        });
      });
    }, 50); // Movement interval
  }

  triggerBreaking(pathIndex: number, square: { position: number; number: number; breaking?: boolean }): void {
    square.breaking = true;
    setTimeout(() => {
      const squareIndex = this.squares[pathIndex].indexOf(square);
      if (squareIndex > -1) {
        this.squares[pathIndex].splice(squareIndex, 1); // Remove square after animation
      }
    }, 1000); // Animation duration
  }

  removeSquare(pathIndex: number, square: { position: number; number: number }): void {
    const squareIndex = this.squares[pathIndex].indexOf(square);
    if (squareIndex > -1) {
      this.squares[pathIndex].splice(squareIndex, 1);
      this.totalScore += square.number; // Add square's number to total score
      this.clickedSquares++; // Increment number of clicked squares

      // Check for round completion
      if (this.clickedSquares % 10 === 0) {
        this.currentRound++;
        this.showSnackbar(`🎉 Congratulations! You completed Round ${this.currentRound - 1}.`);
        this.updateSpeed();
      }
    }
  }

  updateSpeed(): void {
    if (this.currentRound === 2) {
      this.speed = 6; // Speed for 11–20 squares
    } else if (this.currentRound >= 3) {
      this.speed = 8; // Speed for 21+ squares
    }
  }

  showSnackbar(message: string): void {
    this.snackbarVisible = true;
    setTimeout(() => (this.snackbarVisible = false), 3000); // Hide snackbar after 3 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.squareInterval); // Stop square generation
  }
}
