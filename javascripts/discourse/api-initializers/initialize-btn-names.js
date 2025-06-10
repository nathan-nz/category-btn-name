import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

// TRANSLATION_KEYS is still used for predefined categories if needed
const TRANSLATION_KEYS = {
  // Predefined categories can be added here, if any
};

export default apiInitializer("0.8", (api) => {
  // Parse the theme setting to get the list of category IDs specified by the admin
  const eventCategoryIds = settings.category_event_labels.split("|").map(Number);

  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category) {
        // Check if category is in the selected list for 'New Event'
        const useEventLabel = eventCategoryIds.includes(category.id);
        const customTranslationKey = TRANSLATION_KEYS[category.name];
        
        // Decide which label to use
        if (useEventLabel || customTranslationKey === "new_event") {
          return themePrefix("new_event");
        } 
      }

      // Default label for all other categories
      return themePrefix("new_topic");
    },
  });
});
