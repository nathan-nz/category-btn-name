import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

export default apiInitializer("0.8", (api) => {
  const CATEGORY_LABELS = {};
  const defaultLabel = settings.default_button_label || "New Topic";

  try {
    const buttonLabels = settings.category_button_labels.split("\n");
    buttonLabels.forEach((entry) => {
      const [key, label] = entry.split(":");
      const categoryId = parseInt(key.trim(), 10);
      if (!isNaN(categoryId) && label) {
        CATEGORY_LABELS[categoryId] = label.trim();
      }
    });
  } catch (e) {
    console.error("Error parsing category_button_labels setting:", e);
  }

  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",

    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category) {
        return CATEGORY_LABELS[category.id] || defaultLabel;
      } else {
        return this._super(hasDraft, category);
      }
    },
  });
});
