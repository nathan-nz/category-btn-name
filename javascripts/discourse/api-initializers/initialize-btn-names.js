import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

const TRANSLATION_KEYS = {
  "Events": "new_event",  // Customize this as needed for specific categories
  // Add additional categories and their custom translation keys here
};

export default apiInitializer("0.8", (api) => {
  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category && TRANSLATION_KEYS[category.name]) {
        // Use the custom translation key if specified
        return I18n.t(TRANSLATION_KEYS[category.name]);
      } else {
        // Use the default translation key for "New Topic"
        return I18n.t('composer.create_topic.title');
      }
    },
  });
});
