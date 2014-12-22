#!/usr/bin/env xcrun swift

import Cocoa

class ChromeExtensionInstaller: NSObject {
  var relativePath: String?

  func installAsync(path: String) {
    relativePath = path
    if chromeInstances.count == 0 {
      launchChromeWithExtension()
      return
    }

    NSWorkspace.sharedWorkspace().notificationCenter.addObserver(self, selector: "runningApplicationDidTerminate:", name: NSWorkspaceDidTerminateApplicationNotification, object: nil)

    for app in chromeInstances {
      app.terminate()
    }
  }

  func runningApplicationDidTerminate(notification: NSNotification) {
    let app = notification.userInfo![NSWorkspaceApplicationKey]! as NSRunningApplication
    if chromeInstances.count == 0 {
      stopNotifications()
      launchChromeWithExtension()
    }
  }

  var chromeInstances: [NSRunningApplication] {
    return NSRunningApplication.runningApplicationsWithBundleIdentifier("com.google.Chrome") as [NSRunningApplication]
  }

  private func stopNotifications() {
    NSWorkspace.sharedWorkspace().notificationCenter.removeObserver(self)
  }

  private func launchChromeWithExtension() {
    let encodedRelativePath = relativePath!.stringByAddingPercentEscapesUsingEncoding(NSUTF8StringEncoding)!
    let workspace = NSWorkspace.sharedWorkspace()
    let url = NSURL.fileURLWithPath(workspace.fullPathForApplication("Google Chrome")!)!
    let currentPath = NSFileManager.defaultManager().currentDirectoryPath
    let currentURL = NSURL.fileURLWithPath(currentPath)
    let extensionURL = NSURL(string: encodedRelativePath, relativeToURL: currentURL)!
    let extensionPath = extensionURL.path!
    let options = [NSWorkspaceLaunchConfigurationArguments: ["--load-extension=\(extensionPath)"]]
    workspace.launchApplicationAtURL(url, options: .Default, configuration: options, error: nil)
    exit(0)
  }

  deinit {
    stopNotifications()
  }
}

autoreleasepool {
  let relativePath = Process.arguments[1]
  let installer = ChromeExtensionInstaller()
  installer.installAsync(relativePath)
  NSRunLoop.mainRunLoop().run()
}
