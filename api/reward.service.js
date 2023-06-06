import httpCommon from "./http-common";

class RewardService {
  giveReward(data) {
    return httpCommon.post("reward/giveReward", data);
  }

  getRewards() {
    return httpCommon.get("reward/getRewards");
  }
}

export default new RewardService();
