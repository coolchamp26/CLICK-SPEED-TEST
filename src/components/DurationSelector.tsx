interface DurationSelectorProps {
  durations: number[];
  selectedDuration: number;
  onSelect: (duration: number) => void;
  disabled: boolean;
}

const DurationSelector = ({
  durations,
  selectedDuration,
  onSelect,
  disabled,
}: DurationSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {durations.map((duration) => (
        <button
          key={duration}
          onClick={() => onSelect(duration)}
          disabled={disabled}
          className={`duration-pill ${
            selectedDuration === duration ? "active" : ""
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {duration}s
        </button>
      ))}
    </div>
  );
};

export default DurationSelector;
