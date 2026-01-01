import { Copy, RotateCcw, Trophy } from "lucide-react";
import { toast } from "sonner";

interface ResultCardProps {
  clicks: number;
  duration: number;
  cps: number;
  bestCps: number;
  onRestart: () => void;
}

const getPerformance = (cps: number) => {
  if (cps >= 8) return { label: "Pro Clicker", emoji: "🚀", className: "performance-pro" };
  if (cps >= 6) return { label: "Fast", emoji: "⚡", className: "performance-fast" };
  if (cps >= 4) return { label: "Average", emoji: "🙂", className: "performance-average" };
  return { label: "Slow", emoji: "🐢", className: "performance-slow" };
};

const ResultCard = ({ clicks, duration, cps, bestCps, onRestart }: ResultCardProps) => {
  const performance = getPerformance(cps);
  const isNewBest = cps >= bestCps && cps > 0;

  const handleShare = () => {
    const text = `🎯 Click Speed Test Result\n\n${performance.emoji} ${performance.label}\n⏱️ ${duration}s test\n🖱️ ${clicks} clicks\n⚡ ${cps} CPS\n\nTest your speed at: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    toast.success("Result copied to clipboard!");
  };

  return (
    <div className="card-glow rounded-2xl p-8 w-full max-w-md animate-scale-in">
      {/* Performance Badge */}
      <div className="text-center mb-6">
        <span className="text-6xl mb-2 block">{performance.emoji}</span>
        <h3 className={`font-display text-3xl font-bold ${performance.className}`}>
          {performance.label}
        </h3>
        {isNewBest && (
          <div className="flex items-center justify-center gap-2 mt-2 text-performance-pro">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">New Best!</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Duration</p>
          <p className="font-display text-2xl font-bold text-foreground">{duration}s</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Clicks</p>
          <p className="font-display text-2xl font-bold text-foreground">{clicks}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">CPS</p>
          <p className="stat-value !text-2xl">{cps}</p>
        </div>
      </div>

      {/* Best Score */}
      <div className="bg-secondary/50 rounded-xl p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-performance-pro" />
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Best Score</p>
            <p className="font-display text-xl font-bold text-foreground">{bestCps} CPS</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </button>
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-muted transition-all"
        >
          <Copy className="w-5 h-5" />
          Share
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
