<?php

namespace Ceres\Widgets\Checkout;

use Ceres\Widgets\Helper\BaseWidget;
use Ceres\Widgets\Helper\Factories\WidgetSettingsFactory;
use Ceres\Widgets\Helper\WidgetCategories;
use Ceres\Widgets\Helper\Factories\WidgetDataFactory;
use Ceres\Widgets\Helper\WidgetTypes;

class ShippingProfileWidget extends BaseWidget
{
    protected $template = "Ceres::Widgets.Checkout.ShippingProfileWidget";

    public function getData()
    {
        return WidgetDataFactory::make("Ceres::ShippingProfileWidget")
            ->withLabel("Widget.shippingProfileLabel")
            ->withPreviewImageUrl("/images/widgets/shipping-select.svg")
            ->withType(WidgetTypes::CHECKOUT)
            ->withCategory(WidgetCategories::CHECKOUT)
            ->withPosition(100)
            ->withMaxPerPage(1)
            ->toArray();
    }

    public function getSettings()
    {
        /** @var WidgetSettingsFactory $settings */
        $settings = pluginApp(WidgetSettingsFactory::class);

        $settings->createCustomClass();
        $settings->createAppearance();
        $settings->createSpacing();

        return $settings->toArray();
    }
}
