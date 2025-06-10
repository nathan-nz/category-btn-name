import { apiInitializer } from "discourse/lib/api";
import discourseComputed from "discourse-common/utils/decorators";

const TRANSLATION_KEYS = {
  "Events": "new_event",  // Make sure this key exists in your locales
  // Add additional categories and their respective translation keys here
};

export default apiInitializer("0.8", (api) => {
  api.modifyClass("component:d-navigation", {
    pluginId: "category-btn-name",
    
    @discourseComputed("hasDraft", "category")
    createTopicLabel(hasDraft, category) {
      if (!hasDraft && category && TRANSLATION_KEYS[category.name]) {
        // Use the specified translation key for this category
        return I18n.t(`js.${TRANSLATION_KEYS[category.name]}`);
      } else {
        // Use the default translation key for "New Topic"
        return I18n.t('js.composer.create_topic.title');
      }
    },
  });
});
