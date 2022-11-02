### Development

####

Remove old version of app

`adb uninstall org.akroma.wallet.mobile`

### **Getting Started with Android**

You will need Node, Watchman, the React Native command line interface, a JDK, and Android Studio.

While you can use any editor of your choice to develop your app, you will need to install Android Studio in order to set up the necessary tooling to build your React Native app for Android.

#### **Node & Watchman**

We recommend installing Node and Watchman using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```
brew install node
brew install watchman
```

#### **Java Development Kit**

We recommend installing the OpenJDK distribution called Azul Zulu using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```
brew tap homebrew/cask-versions
brew install --cask zulu11
```

The Zulu OpenJDK distribution offers JDKs for both Intel and M1 Macs. This will make sure your builds are faster on M1 Macs compared to using an Intel-based JDK.

If you have already installed JDK on your system, we recommend JDK 11. You may encounter problems using higher JDK versions.

#### **Install Android Studio**

Download and install [Android Studio](https://developer.android.com/studio). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Then, click "Next" to install all of these components.

#### **Install the Android SDK**

Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the Android 12 (S) SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

To do that, open Android Studio, click on "More Actions" button and select "SDK Manager".

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 12 (S) entry, then make sure the following items are checked:

- Android SDK Platform 31
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image or (for Apple M1 Silicon) Google APIs ARM 64 v8a System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 31.0.0 is selected.

Finally, click "Apply" to download and install the Android SDK and related build tools.

#### **Configure the ANDROID_SDK_ROOT environment variable**

The React Native tools require some environment variables to be set up in order to build apps with native code.

Add the following lines to your $HOME/.bash_profile or $HOME/.bashrc (if you are using zsh then ~/.zprofile or ~/.zshrc) config file:

```
export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

Type source $HOME/.bash_profile for bash or source $HOME/.zprofile to load the config into your current shell. Verify that ANDROID_SDK_ROOT has been set by running echo $ANDROID_SDK_ROOT and the appropriate directories have been added to your path by running echo $PATH.

#### **Run**

To run the project just you have to run the following commands:

```
yarn
npm run android
```
