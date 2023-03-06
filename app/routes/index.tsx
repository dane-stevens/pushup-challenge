import { Form } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "~/hooks/interval";

const linkStyles = `rounded bg-blue-300 px-4 py-2 text-slate-900 hover:bg-blue-400 mt-8 inline-block`;

export default function Index() {
  const [step, setStep] = useState("DEFAULT");
  const [amount, setAmount] = useState(0);
  const audioRef321 = useRef(null);
  const audioRefCheer = useRef(null);

  const [time, setTime] = useState(60);
  useInterval(() => {
    if (time >= 0 && step === "REST") {
      setTime((time) => time - 1);
    }
  }, 1000);
  useEffect(() => {
    if (step === "REST") {
      if (time < 4) audioRef321.current.play();
      if (time < 0) setStep("PUSHUPS");
    }
  }, [time]);
  return (
    <div className="bg-slate-900 text-white/90 text-center">
      <div className="max-w-screen-md p-8 h-screen mx-auto flex items-center justify-center">
        <div>
          {step === "COMPLETE" && (
            <div>
              <div className="mb-8 text-7xl">🎉</div>
              <div className="text-4xl">Awesome job!</div>
              <button
                type="button"
                className={linkStyles}
                onClick={() => setStep("DEFAULT")}
              >
                Reset
              </button>
            </div>
          )}
          {step === "PUSHUPS" && (
            <div>
              <H2>Step 3/3</H2>
              <H1>Pushups</H1>
              <div className="text-7xl">{Math.round(amount * 1.5)}</div>
              <button
                type="button"
                onClick={() => {
                  setStep("COMPLETE");
                  return audioRefCheer.current.play();
                }}
                className={linkStyles}
              >
                Complete
              </button>
              <div className="text-left mt-16 bg-white/10 rounded p-4">
                <H2>Notes</H2>
                <div className=" mt-2">
                  Your goal is to perform {Math.round(amount * 1.5)} pushups
                  (1.5 times your max) without ever coming up for a rest! <br />
                  <br />
                  You can "rest" by staying either in a pushup plank position,
                  shaking out an arm, or by getting in a downward dog position,
                  just don't let those knees make contact with the ground again.
                </div>
              </div>
            </div>
          )}
          {step === "REST" && (
            <div>
              <H2>Step 2/3</H2>
              <H1>Rest</H1>
              <div className="text-7xl">{time}</div>
              <small>seconds remaining</small>
              <div className="text-left mt-16 bg-white/10 rounded p-4">
                <H2>Notes</H2>
                <div className=" mt-2">
                  Your goal is to perform {Math.round(amount * 1.5)} pushups
                  (1.5 times your max) without ever coming up for a rest!
                  <br />
                  <br />
                  You can "rest" by staying either in a pushup plank position,
                  shaking out an arm, or by getting in a downward dog position,
                  just don't let those knees make contact with the ground again.
                </div>
              </div>
            </div>
          )}
          {step === "DEFAULT" && (
            <div>
              <H2>Step 1/3</H2>
              <H1>Pushups to failure</H1>
              <Form
                method="get"
                onSubmit={(e) => {
                  e.preventDefault();
                  return setStep("REST");
                  // audioRef321.current.play();
                  // return audioRef321.current.pause();
                }}
              >
                <div className="my-8">
                  <label>Number of pushups completed</label>
                  <input
                    type="number"
                    name="amount"
                    className="block w-full indent-4 rounded border border-slate-800 bg-black/10 outline-none appearance-none py-4"
                    placeholder="Enter a number"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    min={1}
                    max={200}
                    step={1}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-300 rounded py-2 px-4 text-slate-900"
                >
                  Submit
                </button>
              </Form>
              <div className="text-left mt-16 bg-white/10 rounded p-4">
                <H2>Notes</H2>
                <div className=" mt-2">
                  Perform as many reps of bodyweight pushups as you can until
                  failure
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <audio
        ref={audioRef321}
        src="/321.mp3"
        typeof="audio/mp3"
        preload="true"
      ></audio>
      <audio
        ref={audioRefCheer}
        src="/cheer.mp3"
        typeof="audio/mp3"
        preload="true"
      ></audio>
    </div>
  );
}

function H1({ children }: { children: string }) {
  return <h1 className="text-3xl text-blue-300 my-4">{children}</h1>;
}

function H2({ children }: { children: string }) {
  return <h2 className="text-xl">{children}</h2>;
}
