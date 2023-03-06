import { Form, Link, useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { useInterval } from "~/hooks/interval";

const linkStyles = `rounded bg-blue-300 px-4 py-2 text-slate-900 hover:bg-blue-400 mt-8 inline-block`;

export default function Index() {
  const [searchParams] = useSearchParams();
  const amount = Number(searchParams.get("amount"));
  const complete = Boolean(searchParams.get("complete"));

  const [time, setTime] = useState(60);
  useInterval(() => {
    if (time >= 0) {
      setTime((time) => time - 1);
    }
  }, 1000);
  return (
    <div className="bg-slate-900 text-white/90 text-center">
      <div className="max-w-screen-md p-8 h-screen mx-auto flex items-center justify-center">
        <div>
          {complete && (
            <div>
              <div className="mb-8 text-7xl">🎉</div>
              <div className="text-4xl">Awesome job!</div>
              <Link to="/" className={linkStyles}>
                Reset
              </Link>
            </div>
          )}
          {amount > 0 && time < 0 && !complete && (
            <div>
              <H2>Step 3/3</H2>
              <H1>Pushups</H1>
              <div className="text-7xl">{Math.round(amount * 1.5)}</div>
              <Link to="?complete=true" className={linkStyles}>
                Complete
              </Link>
              <div className="text-left mt-16 bg-white/10 rounded p-4">
                <H2>Notes</H2>
                <div className=" mt-2">
                  Your goal is to perform {Math.round(amount * 1.5)} pushups
                  without ever coming up for a rest! You can "rest" by staying
                  either in a pushup plank position, shaking out an arm, or by
                  getting in a downward dog position, just don't let those knees
                  make contact with the ground again.
                </div>
              </div>
            </div>
          )}
          {amount > 0 && time >= 0 && !complete && (
            <div>
              <H2>Step 2/3</H2>
              <H1>Rest</H1>
              <div className="text-7xl">{time}</div>
              <small>seconds remaining</small>
              <div className="text-left mt-16 bg-white/10 rounded p-4">
                <H2>Notes</H2>
                <div className=" mt-2">
                  Your goal is to perform {Math.round(amount * 1.5)} pushups
                  without ever coming up for a rest! You can "rest" by staying
                  either in a pushup plank position, shaking out an arm, or by
                  getting in a downward dog position, just don't let those knees
                  make contact with the ground again.
                </div>
              </div>
            </div>
          )}
          {amount === 0 && !complete && (
            <div>
              <H2>Step 1/3</H2>
              <H1>Pushups to failure</H1>
              <Form method="get">
                <div className="my-8">
                  <label>Number of pushups completed</label>
                  <input
                    type="number"
                    name="amount"
                    className="block w-full indent-4 rounded border border-slate-800 bg-black/10 outline-none appearance-none py-4"
                    placeholder="Enter a number"
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
    </div>
  );
}

function H1({ children }: { children: string }) {
  return <h1 className="text-3xl text-blue-300 my-4">{children}</h1>;
}

function H2({ children }: { children: string }) {
  return <h2 className="text-xl">{children}</h2>;
}
