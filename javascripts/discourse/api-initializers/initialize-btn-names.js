import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";
const PLUGIN_ID = 'category-btn-name';

const TRANSLATION_KEYS = {
  "Adok-Veszek": "post_ad",
  "Modok": "post_ad",
  "Szettek": "post_ad",
  "RBA / RDA / RDTA / RTA": "post_ad",
  "Porlasztós Tankok": "post_ad",
  "Kiegészítők": "post_ad",
  "Aromák és Kellékek": "post_ad",
  "Csere E-Cigire": "post_ad",
  "Aukció": "post_ad",
  "Értékelések": "review",
  "Talált / Elveszett": "report",
  "Események": "new_event",
  "YouTuber": "share_video",
  "Jobban Vagyok!": "submit_story",
  "Utazó Vape": "new_offer",
};

export default apiInitializer("0.8", (api) => {
  api.modifyClass("component:d-navigation", {
    pluginId: PLUGIN_ID,
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category && TRANSLATION_KEYS[category.name]) {
        return themePrefix(TRANSLATION_KEYS[category.name]);
      } else {
        return this._super(hasDraft);
      }
    },
  });
});
