import defineApp from "../../helpers/define-app";
import triggers from './triggers';

export default defineApp({
  name: "Scheduler",
  key: "scheduler",
  iconUrl: "{BASE_URL}/apps/scheduler/assets/favicon.svg",
  docUrl: "https://automatisch.io/docs/scheduler",
  authDocUrl: "https://automatisch.io/docs/connections/scheduler",
  baseUrl: '',
  apiBaseUrl: '',
  primaryColor: "0059F7",
  beforeRequest: [],
  supportsConnections: false,
  triggers,
});
