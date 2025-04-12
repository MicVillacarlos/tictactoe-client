interface BoardProps {
    board: string[];
    handleClick?: (index: number) => void;
  }
  
  const Board = ({ board, handleClick}: BoardProps) => {
    return (
      <div>
        <div className="grid grid-cols-3 gap-2 w-64 mx-auto">
          {board.map((cell, i) => (
            <div
              key={i}
              onClick={() => handleClick && handleClick(i)}
              className="w-20 h-20 flex items-center justify-center border border-gray-400 text-2xl font-bold cursor-pointer bg-white hover:bg-gray-200 rounded"
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Board;
  