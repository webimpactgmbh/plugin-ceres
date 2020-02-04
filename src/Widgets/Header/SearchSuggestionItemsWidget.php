<?php

namespace Ceres\Widgets\Header;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class SearchSuggestionItemsWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Header.SearchSuggestionItemsWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::SearchSuggestionItems")
            ->withLabel("Widget.searchSuggestionItemsLabel")
            ->withPreviewImageUrl("/images/widgets/search-suggestion-items.svg")
            ->withType(WidgetTypes::ITEM_SEARCH)
            ->withCategory(WidgetCategories::HEADER)
            ->withPosition(100)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settingsFactory */
        $settingsFactory = pluginApp(WidgetSettingsFactory::class);

        $settingsFactory->createCustomClass();

        $settingsFactory->createAppearance();

        $settingsFactory->createCheckbox("showItemImages")
            ->withName("Widget.searchSuggestionItemsShowItemImagesLabel")
            ->withDefaultValue(false);

        $settingsFactory->createCheckbox("forwardToSingleItem")
            ->withName("Widget.searchSuggestionItemsForwardToSingleItemLabel")
            ->withDefaultValue(false);

        $settingsFactory->createSpacing();

        return $settingsFactory->toArray();
    }
}
