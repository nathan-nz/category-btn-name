import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

export default apiInitializer("0.8", (api) => {
  const CATEGORY_LABELS = {};
  
  try {
    settings.category_button_labels.forEach((entry) => {
      const { category, label } = entry;
      if (category && label) {
        CATEGORY_LABELS[category.trim()] = label.trim();
      }
    });
  } catch (e) {
    console.error("Error parsing category_button_labels setting:", e);
  }

  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category && CATEGORY_LABELS[category.name]) {
        return CATEGORY_LABELS[category.name];
      } else {
        return this._super(hasDraft);
      }
    },
  });
});
