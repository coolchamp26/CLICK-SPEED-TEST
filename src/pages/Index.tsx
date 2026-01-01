import { Trophy, MousePointer2 } from "lucide-react";
import ClickButton from "@/components/ClickButton";
import DurationSelector from "@/components/DurationSelector";
import Timer from "@/components/Timer";
import ResultCard from "@/components/ResultCard";
import InfoSection from "@/components/InfoSection";
import { useClickTest } from "@/hooks/useClickTest";

const DURATIONS = [1, 5, 10, 30];

const Index = () => {
  const {
    status,
    clickCount,
    timeLeft,
    selectedDuration,
    cps,
    bestCps,
    setSelectedDuration,
    handleClick,
    resetTest,
  } = useClickTest();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-8 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <MousePointer2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-display text-xl sm:text-2xl font-bold glow-text">
              Click Speed Test
            </h1>
          </div>
          {bestCps > 0 && (
            <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-full">
              <Trophy className="w-4 h-4 text-performance-pro" />
              <span className="font-display font-bold text-sm">{bestCps} CPS</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Test Area */}
      <main className="px-4 pb-8">
        <div className="max-w-4xl mx-auto">
          {status !== "finished" ? (
            <div className="flex flex-col items-center gap-10">
              {/* Duration Selector */}
              <div className="w-full max-w-md">
                <p className="text-center text-muted-foreground mb-4 text-sm uppercase tracking-wider">
                  Select Duration
                </p>
                <DurationSelector
                  durations={DURATIONS}
                  selectedDuration={selectedDuration}
                  onSelect={setSelectedDuration}
                  disabled={status === "active"}
                />
              </div>

              {/* Timer */}
              <Timer
                timeLeft={timeLeft}
                totalTime={selectedDuration}
                isActive={status === "active"}
              />

              {/* Click Button */}
              <ClickButton
                onClick={handleClick}
                disabled={false}
                isActive={status === "active"}
                clickCount={clickCount}
              />

              {/* Instructions */}
              <p className="text-muted-foreground text-center max-w-sm">
                {status === "idle"
                  ? "Click the button to start the test"
                  : "Keep clicking as fast as you can!"}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-8">
              <ResultCard
                clicks={clickCount}
                duration={selectedDuration}
                cps={cps}
                bestCps={bestCps}
                onRestart={resetTest}
              />
              
              {/* Quick Duration Switch */}
              <div className="text-center">
                <p className="text-muted-foreground mb-3 text-sm">Try a different duration:</p>
                <DurationSelector
                  durations={DURATIONS}
                  selectedDuration={selectedDuration}
                  onSelect={(d) => {
                    setSelectedDuration(d);
                    resetTest();
                  }}
                  disabled={false}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Info Sections */}
      <InfoSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            Test your clicking speed and challenge yourself to become a Pro Clicker!
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
