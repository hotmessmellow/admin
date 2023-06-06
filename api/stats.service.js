import httpCommon from "./http-common";

class StatsDataService {
  getStats() {
    return httpCommon.get("/stats");
  }
}

export default new StatsDataService();
