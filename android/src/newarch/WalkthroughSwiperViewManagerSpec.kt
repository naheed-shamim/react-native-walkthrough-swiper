package com.walkthroughswiper

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.WalkthroughSwiperViewManagerDelegate
import com.facebook.react.viewmanagers.WalkthroughSwiperViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class WalkthroughSwiperViewManagerSpec<T : View> : SimpleViewManager<T>(), WalkthroughSwiperViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = WalkthroughSwiperViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

  companion object {
    init {
      if (BuildConfig.CODEGEN_MODULE_REGISTRATION != null) {
        SoLoader.loadLibrary(BuildConfig.CODEGEN_MODULE_REGISTRATION)
      }
    }
  }
}
