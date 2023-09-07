package com.walkthroughswiper

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = WalkthroughSwiperViewManager.NAME)
class WalkthroughSwiperViewManager :
  WalkthroughSwiperViewManagerSpec<WalkthroughSwiperView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): WalkthroughSwiperView {
    return WalkthroughSwiperView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: WalkthroughSwiperView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "WalkthroughSwiperView"
  }
}
