#!/usr/bin/env python3
"""
Simple Tic-Tac-Toe Game
A two-player command-line game where players take turns marking spaces on a 3x3 grid.
"""


def print_board(board):
    """Display the current game board."""
    print("\n")
    print(f" {board[0]} | {board[1]} | {board[2]} ")
    print("---+---+---")
    print(f" {board[3]} | {board[4]} | {board[5]} ")
    print("---+---+---")
    print(f" {board[6]} | {board[7]} | {board[8]} ")
    print("\n")


def check_winner(board, player):
    """Check if the specified player has won."""
    win_conditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  # Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  # Columns
        [0, 4, 8], [2, 4, 6]              # Diagonals
    ]

    for condition in win_conditions:
        if all(board[i] == player for i in condition):
            return True
    return False


def is_board_full(board):
    """Check if the board is full (tie game)."""
    return all(space != ' ' for space in board)


def get_player_move(board, player):
    """Get and validate player move."""
    while True:
        try:
            move = input(f"Player {player}, enter your move (1-9): ")
            move = int(move) - 1

            if move < 0 or move > 8:
                print("Invalid input! Please enter a number between 1 and 9.")
                continue

            if board[move] != ' ':
                print("That space is already taken! Choose another.")
                continue

            return move
        except ValueError:
            print("Invalid input! Please enter a number between 1 and 9.")
        except KeyboardInterrupt:
            print("\nGame interrupted!")
            exit(0)


def play_game():
    """Main game loop."""
    board = [' '] * 9
    current_player = 'X'

    print("Welcome to Tic-Tac-Toe!")
    print("Positions are numbered 1-9:")
    print("\n 1 | 2 | 3 ")
    print("---+---+---")
    print(" 4 | 5 | 6 ")
    print("---+---+---")
    print(" 7 | 8 | 9 ")
    print("\n")

    while True:
        print_board(board)
        move = get_player_move(board, current_player)
        board[move] = current_player

        if check_winner(board, current_player):
            print_board(board)
            print(f"Congratulations! Player {current_player} wins!")
            break

        if is_board_full(board):
            print_board(board)
            print("It's a tie!")
            break

        current_player = 'O' if current_player == 'X' else 'X'

    play_again = input("\nWould you like to play again? (y/n): ")
    if play_again.lower() == 'y':
        play_game()
    else:
        print("Thanks for playing!")


if __name__ == "__main__":
    play_game()
