import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

export default apiInitializer("0.8", (api) => {
  const CATEGORY_LABELS = {};

  try {
    const buttonLabels = settings.category_button_labels.split("\n");
    buttonLabels.forEach((entry) => {
      const [categoryId, label] = entry.split(":");
      if (categoryId && label) {
        CATEGORY_LABELS[parseInt(categoryId.trim(), 10)] = label.trim();
      }
    });
  } catch (e) {
    console.error("Error parsing category_button_labels setting:", e);
  }

  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category && CATEGORY_LABELS[category.id]) {
        return CATEGORY_LABELS[category.id];
      } else {
        return this._super(hasDraft, category);
      }
    },
  });
});
