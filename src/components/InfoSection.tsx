import { Info, Zap, Target, Clock } from "lucide-react";

const InfoSection = () => {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* How It Works */}
      <div className="card-glow rounded-2xl p-8 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-primary/10">
            <Info className="w-6 h-6 text-primary" />
          </div>
          <h2 className="font-display text-2xl font-bold">How It Works</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">1. Choose Duration</h3>
            <p className="text-muted-foreground text-sm">Select your preferred test length: 1s, 5s, 10s, or 30s</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">2. Click Fast</h3>
            <p className="text-muted-foreground text-sm">Click the button as fast as you can during the countdown</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">3. See Results</h3>
            <p className="text-muted-foreground text-sm">Get your CPS score and performance rating instantly</p>
          </div>
        </div>
      </div>

      {/* About CPS */}
      <div className="card-glow rounded-2xl p-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-accent/10">
            <Zap className="w-6 h-6 text-accent" />
          </div>
          <h2 className="font-display text-2xl font-bold">About CPS</h2>
        </div>
        <p className="text-muted-foreground mb-6">
          CPS stands for <strong className="text-foreground">Clicks Per Second</strong>. It measures how many times you can click in one second. 
          The average person clicks around 4-6 times per second. Pro gamers and speed clickers can reach 10+ CPS!
        </p>
        <div className="grid sm:grid-cols-4 gap-4">
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">🐢</span>
            <p className="font-semibold performance-slow">0-4 CPS</p>
            <p className="text-muted-foreground text-sm">Slow</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">🙂</span>
            <p className="font-semibold performance-average">4-6 CPS</p>
            <p className="text-muted-foreground text-sm">Average</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">⚡</span>
            <p className="font-semibold performance-fast">6-8 CPS</p>
            <p className="text-muted-foreground text-sm">Fast</p>
          </div>
          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <span className="text-3xl mb-2 block">🚀</span>
            <p className="font-semibold performance-pro">8+ CPS</p>
            <p className="text-muted-foreground text-sm">Pro Clicker</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
