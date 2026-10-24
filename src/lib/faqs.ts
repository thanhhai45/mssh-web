/**
 * Shown at the bottom of the page and handed to search engines as FAQPage
 * structured data, so the two can never disagree. Plain text only.
 */
export const faqs = [
  {
    question: 'Is mssh free?',
    answer:
      'Yes. There is no account, no subscription and no telemetry. Download the app from the GitHub releases page.',
  },
  {
    question: 'How does mssh reach an EC2 instance with no open port and no public IP?',
    answer:
      'Through AWS Systems Manager Session Manager, the same way `aws ssm start-session` does. ' +
      'The instance needs the SSM Agent and an IAM role with AmazonSSMManagedInstanceCore; ' +
      'your computer needs the AWS CLI and the Session Manager plugin. With SSH over SSM, mssh then ' +
      'runs a real SSH handshake through that tunnel, so you log in as your own user and can transfer files.',
  },
  {
    question: 'Where are my connections and passwords stored?',
    answer:
      'In a local SQLite database on your computer, readable by you alone (0600 in a 0700 directory). ' +
      'Nothing is synced or sent anywhere. AWS credentials stay with the AWS CLI unless you choose ' +
      'to keep a key pair on a workspace, and even then they are handed to the AWS CLI through its ' +
      'environment, never its command line.',
  },
  {
    question: 'Why does macOS warn me the first time I open it?',
    answer:
      'The app is not yet signed with an Apple Developer ID, so Gatekeeper cannot vouch for it and ' +
      'blocks it the first time. Close the warning with Done, then open System Settings → Privacy & ' +
      'Security, scroll to Security and click Open Anyway next to mssh, and confirm with your password. ' +
      'You only have to do this once. Alternatively, run ' +
      '`xattr -dr com.apple.quarantine /Applications/mssh.app` in a terminal.',
  },
  {
    question: 'Does mssh work on Linux or Windows?',
    answer:
      'Linux, yes — since version 0.9.0. There is a .deb for Ubuntu, Debian and Mint, an .rpm for ' +
      'Fedora and openSUSE, both for x86_64 and ARM64, and an x86_64 AppImage for any other ' +
      'distribution. It needs glibc 2.34 or newer (Ubuntu 22.04, Debian 12 and later). ' +
      'Windows arrived in 0.10.0 as a preview: an x64 installer and a portable zip. Every connection ' +
      'kind is tested by CI on Windows, but it has not been used much by hand yet, and the Files ' +
      'drawer is not available on System SSH connections there. It needs Windows 10 version 1809 ' +
      'or newer, or Windows 11, on x64.',
  },
  {
    question: 'How do I upgrade to a new version?',
    answer:
      'Download the new release and install it over the previous one. Connections, passwords, settings ' +
      'and session history stay where they were, and the database is upgraded in place from any earlier ' +
      'release. There are no automatic updates yet — watch the GitHub releases to hear about new versions.',
  },
  {
    question: 'Why does Windows warn me the first time I run it?',
    answer:
      'Neither the installer nor the portable mssh.exe is signed with a code signing certificate, so ' +
      'SmartScreen shows “Windows protected your PC”. Choose More info, then Run anyway — you only ' +
      'have to do this once. Your browser may also ask whether to keep the download, for the same reason.',
  },
  {
    question: 'Can I keep using my ~/.ssh/config?',
    answer:
      'Yes. The System SSH kind takes a Host alias and nothing else: OpenSSH supplies the user, ' +
      'the key, ProxyCommand, jump hosts and host-key checking, exactly as on the command line.',
  },
]
