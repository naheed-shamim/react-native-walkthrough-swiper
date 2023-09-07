#ifdef RCT_NEW_ARCH_ENABLED
#import "WalkthroughSwiperView.h"

#import <react/renderer/components/RNWalkthroughSwiperViewSpec/ComponentDescriptors.h>
#import <react/renderer/components/RNWalkthroughSwiperViewSpec/EventEmitters.h>
#import <react/renderer/components/RNWalkthroughSwiperViewSpec/Props.h>
#import <react/renderer/components/RNWalkthroughSwiperViewSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"
#import "Utils.h"

using namespace facebook::react;

@interface WalkthroughSwiperView () <RCTWalkthroughSwiperViewViewProtocol>

@end

@implementation WalkthroughSwiperView {
    UIView * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
    return concreteComponentDescriptorProvider<WalkthroughSwiperViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const WalkthroughSwiperViewProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
    const auto &oldViewProps = *std::static_pointer_cast<WalkthroughSwiperViewProps const>(_props);
    const auto &newViewProps = *std::static_pointer_cast<WalkthroughSwiperViewProps const>(props);

    if (oldViewProps.color != newViewProps.color) {
        NSString * colorToConvert = [[NSString alloc] initWithUTF8String: newViewProps.color.c_str()];
        [_view setBackgroundColor: [Utils hexStringToColor:colorToConvert]];
    }

    [super updateProps:props oldProps:oldProps];
}

Class<RCTComponentViewProtocol> WalkthroughSwiperViewCls(void)
{
    return WalkthroughSwiperView.class;
}

@end
#endif
