package org.akroma.wallet.mobile;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.rnfs.RNFSPackage;

import java.util.List;
import java.util.Arrays;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "AkromaWallet";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new MainActivityDelegate(this, getMainComponentName());
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    // @Override
    // protected ReactRootView createRootView() {
    //   ReactRootView reactRootView = new ReactRootView(getContext());
    //   // If you opted-in for the New Architecture, we enable the Fabric Renderer.
    //   reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
    //   return reactRootView;
    // }

    // @Override
    // protected boolean isConcurrentRootEnabled() {
    //   // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
    //   // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
    //   return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    // }
  }

  protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new RNFSPackage() 
    );
  }
}
