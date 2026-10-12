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
      'your Mac needs the AWS CLI and the Session Manager plugin. With SSH over SSM, mssh then ' +
      'runs a real SSH handshake through that tunnel, so you log in as your own user and can transfer files.',
  },
  {
    question: 'Where are my connections and passwords stored?',
    answer:
      'In a local SQLite database on your Mac, readable by you alone (0600 in a 0700 directory). ' +
      'Nothing is synced or sent anywhere. AWS credentials stay with the AWS CLI unless you choose ' +
      'to keep a key pair on a workspace, and even then they are handed to the AWS CLI through its ' +
      'environment, never its command line.',
  },
  {
    question: 'Why does macOS warn me the first time I open it?',
    answer:
      'The app is not yet signed with an Apple Developer ID, so Gatekeeper cannot vouch for it. ' +
      'Right-click mssh.app, choose Open, and confirm — you only have to do this once.',
  },
  {
    question: 'Does mssh work on Windows or Linux?',
    answer:
      'Not yet. mssh is built and tested on macOS (Apple silicon and Intel). Windows and Linux ' +
      'installers are planned.',
  },
  {
    question: 'Can I keep using my ~/.ssh/config?',
    answer:
      'Yes. The System SSH kind takes a Host alias and nothing else: OpenSSH supplies the user, ' +
      'the key, ProxyCommand, jump hosts and host-key checking, exactly as on the command line.',
  },
]
