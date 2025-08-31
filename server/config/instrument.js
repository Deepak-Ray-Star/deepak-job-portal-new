// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://184b3ac2931b4198996e2347dd91036f@o4509900289015808.ingest.us.sentry.io/4509940120879104",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions

});

Sentry.profiler.startProfiler();


// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan({
  name: "My First Transaction",
}, () => {
  // The code executed here will be profiled
});

Sentry.profiler.stopProfiler();