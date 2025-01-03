---
lang: en-US
title: "How to Build a Honeypot in Python: A Practical Guide to Security Deception"
description: "Article(s) > How to Build a Honeypot in Python: A Practical Guide to Security Deception"
icon: fa-brands fa-python
category:
  - Python
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - python
  - py
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Honeypot in Python: A Practical Guide to Security Deception"
    - property: og:description
      content: "How to Build a Honeypot in Python: A Practical Guide to Security Deception"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-honeypot-with-python.html
prev: /programming/py/articles/README.md
date: 2024-12-20
isOriginal: false
author:
  - name: Chaitanya Rahalkar
    url: https://freecodecamp.org/news/author/chaitanyarahalkar/
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1734581440876/9b4a1d00-6185-4666-94cc-97131eed03fa.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Python > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/py/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Honeypot in Python: A Practical Guide to Security Deception"
  desc="In cybersecurity, a honeypot is a decoy system that’s designed to attract and then detect potential attackers attempting to compromise the system. Just like a pot of honey sitting out in the open would attract flies. Think of these honeypots as secur..."
  url="https://freecodecamp.org/news/build-a-honeypot-with-python"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/res/hashnode/image/upload/v1734581440876/9b4a1d00-6185-4666-94cc-97131eed03fa.png"/>

In cybersecurity, a honeypot is a decoy system that’s designed to attract and then detect potential attackers attempting to compromise the system. Just like a pot of honey sitting out in the open would attract flies.

Think of these honeypots as security cameras for your system. Just as a security camera helps us understand who's trying to break into a building and how they're doing it, these honeypots will help you understand who's trying to attack your system and what techniques they're using.

By the end of this tutorial, you'll be able to write a demo honeypot in Python and understand how honeypots work.

---

## Understanding the Types of Honeypots

Before we start designing our own honeypot, let’s quickly understand their different types:

1. Production Honeypots: These types of honeypots are placed in an actual production environment and are used to detect actual security attacks. They are typically simple in design, easy to maintain and deploy, and offer limited interaction to reduce risk.
2. Research Honeypots: These are more complex systems set up by security researchers to study attack patterns, perform empirical analysis on these patterns, collect malware samples, and understand new attack techniques that aren’t discovered previously. They often emulate entire operating systems or networks rather than behaving like an application in the production environment.

For this tutorial, we will be building a medium-interaction honeypot that logs connection attempts and basic attacker behavior.

---

## How to Set Up Your Development Environment

Let’s begin by setting up your development environment in Python. Run the following commands:

```py
import socket
import sys
import datetime
import json
import threading
from pathlib import Path

# Configure logging directory
LOG_DIR = Path("honeypot_logs")
LOG_DIR.mkdir(exist_ok=True)
```

We will be sticking to the built in libraries so won’t be needing to install any external dependencies. We will be storing our logs in the <FontIcon icon="fas fa-folder-open"/>`honeypot_logs` directory.

---

## How to Build the Core Honeypot

Our basic honeypot will be comprised of three components:

1. A network listener that accepts connections
2. A logging system to record activities
3. A basic emulation service to interact with attackers

Now let’s begin by initializing the core Honeypot class:

```py :collapsed-lines
class Honeypot:
    def __init__(self, bind_ip="0.0.0.0", ports=None):
        self.bind_ip = bind_ip
        self.ports = ports or [21, 22, 80, 443]  # Default ports to monitor
        self.active_connections = {}
        self.log_file = LOG_DIR / f"honeypot_{datetime.datetime.now().strftime('%Y%m%d')}.json"

    def log_activity(self, port, remote_ip, data):
        """Log suspicious activity with timestamp and details"""
        activity = {
            "timestamp": datetime.datetime.now().isoformat(),
            "remote_ip": remote_ip,
            "port": port,
            "data": data.decode('utf-8', errors='ignore')
        }

        with open(self.log_file, 'a') as f:
            json.dump(activity, f)
            f.write('\n')

    def handle_connection(self, client_socket, remote_ip, port):
        """Handle individual connections and emulate services"""
        service_banners = {
            21: "220 FTP server ready\r\n",
            22: "SSH-2.0-OpenSSH_8.2p1 Ubuntu-4ubuntu0.1\r\n",
            80: "HTTP/1.1 200 OK\r\nServer: Apache/2.4.41 (Ubuntu)\r\n\r\n",
            443: "HTTP/1.1 200 OK\r\nServer: Apache/2.4.41 (Ubuntu)\r\n\r\n"
        }

        try:
            # Send appropriate banner for the service
            if port in service_banners:
                client_socket.send(service_banners[port].encode())

            # Receive data from attacker
            while True:
                data = client_socket.recv(1024)
                if not data:
                    break

                self.log_activity(port, remote_ip, data)

                # Send fake response
                client_socket.send(b"Command not recognized.\r\n")

        except Exception as e:
            print(f"Error handling connection: {e}")
        finally:
            client_socket.close()
```

This class has a lot of important information in it, so let’s go over each function one by one.

The `__init__` function records the ip and port numbers on which we’ll host the honeypot, as well as the path / filename of the log file. We will also be maintaining a record of the total number of active connections we have to the honeypot.

The `log_activity` function is going to receive the information about the IP, the data, and the port to which the IP attempted a connection. Then we’ll append this information to our JSON-formatted log file.

The `handle_connection` function is going to mimic these services that will be running on the different ports we have. We will have the honeypot running on ports 21, 22, 80 and 443. These services are for FTP, SSH, HTTP and the HTTPS protocol, respectively. So any attacker attempting to interact with the honeypot should expect these services on these ports.

To mimic the behavior of these services, we’ll use the service banners that they use in reality. This function will first send the appropriate banner when the attacker connects, and then receive the data and log it. The honeypot will also send a fake response “*Command not recognized*” back to the attacker.

### Implement the Network Listeners

Now let’s implement the network listeners that will be handling the incoming connections. For this, we’ll be using simple socket programming. If you aren’t aware of how socket programming works, [check out this article](/freecodecamp.org/socket-programming-in-python.md) that explains some concepts related to it.

```py :collapsed-lines
def start_listener(self, port):
    """Start a listener on specified port"""
    try:
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind((self.bind_ip, port))
        server.listen(5)

        print(f"[*] Listening on {self.bind_ip}:{port}")

        while True:
            client, addr = server.accept()
            print(f"[*] Accepted connection from {addr[0]}:{addr[1]}")

            # Handle connection in separate thread
            client_handler = threading.Thread(
                target=self.handle_connection,
                args=(client, addr[0], port)
            )
            client_handler.start()

    except Exception as e:
        print(f"Error starting listener on port {port}: {e}")
```

The `start_listener` function will start the server and listen on the provided port. The `bind_ip` for us is going to be `0.0.0.0` which indicates that the server will be listening on all network interfaces.

Now, we will handle each new connection in a separate thread, since there could be instances where multiple attackers attempt to interact with the honeypot or an attacking script or tool is scanning the honeypot. If you aren’t aware of how threading works, you can [check out this article](/freecodecamp.org/concurrency-in-python.md) that explains threading and concurrency in Python.

Also, make sure to put this function in the core `Honeypot` class.

### Run the Honeypot

Now let’s create the `main` function that will start our honeypot.

```py :collapsed-lines
def main():
    honeypot = Honeypot()

    # Start listeners for each port in separate threads
    for port in honeypot.ports:
        listener_thread = threading.Thread(
            target=honeypot.start_listener,
            args=(port,)
        )
        listener_thread.daemon = True
        listener_thread.start()

    try:
        # Keep main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[*] Shutting down honeypot...")
        sys.exit(0)

if __name__ == "__main__":
    main()
```

This function instantiates the `Honeypot` class and starts the listeners for each of our defined ports (21,22,80,443) as a separate thread. Now, we’ll keep our main thread that is running our actual program alive by putting it in an infinite loop. Put this all together in a script and run it.

### Write the Honeypot Attack Simulator

Now let’s try to simulate some attack scenarios and target our honeypot so that we can collect some data in our JSON log file.

This simulator will help us demonstrate a few important aspects about honeypots:

1. Realistic attack patterns: The simulator will simulate common attack patterns like port scanning, brute force attempts, and service-specific exploits.
2. Variable intensity: The simulator will adjust the intensity of the simulation to test how your honeypot handles different loads.
3. Several attack types: It will demonstrate different types of attacks that real attackers might attempt, helping you understand how your honeypot responds to each.
4. Concurrent connections: The simulator will use threading to test how your honeypot handles multiple simultaneous connections.

```py :collapsed-lines title="honeypot_simulator.py"
import socket
import time
import random
import threading
from concurrent.futures import ThreadPoolExecutor
import argparse

class HoneypotSimulator:
    """
    A class to simulate different types of connections and attacks against our honeypot.
    This helps in testing the honeypot's logging and response capabilities.
    """

    def __init__(self, target_ip="127.0.0.1", intensity="medium"):
        # Configuration for the simulator
        self.target_ip = target_ip
        self.intensity = intensity

        # Common ports that attackers often probe
        self.target_ports = [21, 22, 23, 25, 80, 443, 3306, 5432]

        # Dictionary of common commands used by attackers for different services
        self.attack_patterns = {
            21: [  # FTP commands
                "USER admin\r\n",
                "PASS admin123\r\n",
                "LIST\r\n",
                "STOR malware.exe\r\n"
            ],
            22: [  # SSH attempts
                "SSH-2.0-OpenSSH_7.9\r\n",
                "admin:password123\n",
                "root:toor\n"
            ],
            80: [  # HTTP requests
                "GET / HTTP/1.1\r\nHost: localhost\r\n\r\n",
                "POST /admin HTTP/1.1\r\nHost: localhost\r\nContent-Length: 0\r\n\r\n",
                "GET /wp-admin HTTP/1.1\r\nHost: localhost\r\n\r\n"
            ]
        }

        # Intensity settings affect the frequency and volume of simulated attacks
        self.intensity_settings = {
            "low": {"max_threads": 2, "delay_range": (1, 3)},
            "medium": {"max_threads": 5, "delay_range": (0.5, 1.5)},
            "high": {"max_threads": 10, "delay_range": (0.1, 0.5)}
        }

    def simulate_connection(self, port):
        """
        Simulates a connection attempt to a specific port with realistic attack patterns
        """
        try:
            # Create a new socket connection
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(3)

            print(f"[*] Attempting connection to {self.target_ip}:{port}")
            sock.connect((self.target_ip, port))

            # Get banner if any
            banner = sock.recv(1024)
            print(f"[+] Received banner from port {port}: {banner.decode('utf-8', 'ignore').strip()}")

            # Send attack patterns based on the port
            if port in self.attack_patterns:
                for command in self.attack_patterns[port]:
                    print(f"[*] Sending command to port {port}: {command.strip()}")
                    sock.send(command.encode())

                    # Wait for response
                    try:
                        response = sock.recv(1024)
                        print(f"[+] Received response: {response.decode('utf-8', 'ignore').strip()}")
                    except socket.timeout:
                        print(f"[-] No response received from port {port}")

                    # Add realistic delay between commands
                    time.sleep(random.uniform(*self.intensity_settings[self.intensity]["delay_range"]))

            sock.close()

        except ConnectionRefusedError:
            print(f"[-] Connection refused on port {port}")
        except socket.timeout:
            print(f"[-] Connection timeout on port {port}")
        except Exception as e:
            print(f"[-] Error connecting to port {port}: {e}")

    def simulate_port_scan(self):
        """
        Simulates a basic port scan across common ports
        """
        print(f"\n[*] Starting port scan simulation against {self.target_ip}")
        for port in self.target_ports:
            self.simulate_connection(port)
            time.sleep(random.uniform(0.1, 0.3))

    def simulate_brute_force(self, port):
        """
        Simulates a brute force attack against a specific service
        """
        common_usernames = ["admin", "root", "user", "test"]
        common_passwords = ["password123", "admin123", "123456", "root"]

        print(f"\n[*] Starting brute force simulation against port {port}")

        for username in common_usernames:
            for password in common_passwords:
                try:
                    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                    sock.settimeout(2)
                    sock.connect((self.target_ip, port))

                    if port == 21:  # FTP
                        sock.send(f"USER {username}\r\n".encode())
                        sock.recv(1024)
                        sock.send(f"PASS {password}\r\n".encode())
                    elif port == 22:  # SSH
                        sock.send(f"{username}:{password}\n".encode())

                    sock.close()
                    time.sleep(random.uniform(0.1, 0.3))

                except Exception as e:
                    print(f"[-] Error in brute force attempt: {e}")

    def run_continuous_simulation(self, duration=300):
        """
        Runs a continuous simulation for a specified duration
        """
        print(f"\n[*] Starting continuous simulation for {duration} seconds")
        print(f"[*] Intensity level: {self.intensity}")

        end_time = time.time() + duration

        with ThreadPoolExecutor(
            max_workers=self.intensity_settings[self.intensity]["max_threads"]
        ) as executor:
            while time.time() < end_time:
                # Mix of different attack patterns
                simulation_choices = [
                    lambda: self.simulate_port_scan(),
                    lambda: self.simulate_brute_force(21),
                    lambda: self.simulate_brute_force(22),
                    lambda: self.simulate_connection(80)
                ]

                # Randomly choose and execute an attack pattern
                executor.submit(random.choice(simulation_choices))
                time.sleep(random.uniform(*self.intensity_settings[self.intensity]["delay_range"]))

def main():
    """
    Main function to run the honeypot simulator with command-line arguments
    """
    parser = argparse.ArgumentParser(description="Honeypot Attack Simulator")
    parser.add_argument("--target", default="127.0.0.1", help="Target IP address")
    parser.add_argument(
        "--intensity",
        choices=["low", "medium", "high"],
        default="medium",
        help="Simulation intensity level"
    )
    parser.add_argument(
        "--duration",
        type=int,
        default=300,
        help="Simulation duration in seconds"
    )

    args = parser.parse_args()

    simulator = HoneypotSimulator(args.target, args.intensity)

    try:
        simulator.run_continuous_simulation(args.duration)
    except KeyboardInterrupt:
        print("\n[*] Simulation interrupted by user")
    except Exception as e:
        print(f"[-] Simulation error: {e}")
    finally:
        print("\n[*] Simulation complete")

if __name__ == "__main__":
    main()
```

We have a lot going on in this simulation script, so let’s break it down one by one. I’ve also added comments for every function and operation to make this a bit more readable in the code.

We first have our utility class called the `HoneypotSimulator`. In this class, we have the `__init__` function that sets up the basic configuration for our simulator. It takes two parameters: a target IP address (defaulting to `localhost`) and an intensity level (defaulting to "medium").

We also define three important components: the target ports to probe (common services like FTP, SSH, HTTP), attack patterns specific to each service (like login attempts and commands), and intensity settings that control how aggressive our simulation will be through thread counts and timing delays.

The `simulate_connection` function handles individual connection attempts to a specific port. It creates a socket connection, tries to get any service banners (like SSH version information), and then sends appropriate attack commands based on the service type. We have added error handling for common network issues and also added realistic delays between commands to mimic human interaction.

Our `simulate_port_scan` function acts like a reconnaissance tool, that will systematically chec each port in our target list. It's similar to how tools like `nmap` work – going through ports one by one to see what services are available. For each port, it calls the `simulate_connection` function and adds small random delays to make the scan pattern look more natural.

The `simulate_brute_force` function maintains lists of common usernames and passwords, attempting different combinations against services like FTP and SSH. For each attempt, it creates a new connection, sends the login credentials in the correct format for that service, and then closes the connection. This helps us to test how well the honeypot detects and logs credential stuffing attacks.

The `run_continuous_simulation` function runs for a specified duration, randomly choosing between different attack types like port scanning, brute force, or specific service attacks. It uses Python's `ThreadPoolExecutor` to run multiple attacks simultaneously based on the specified intensity level.

Finally, we have the `main` function that provides the command-line interface for the simulator. It uses `argparse` to handle command-line arguments, letting users specify the target IP, intensity level, and duration of the simulation. It creates an instance of the `HoneypotSimulator` class and manages the overall execution, including proper handling of user interruptions and errors.

After putting the simulator code in a separate script, run it with the following command:

```sh
# Run with default settings (medium intensity, localhost, 5 minutes)
python honeypot_simulator.py

# Run with custom settings
python honeypot_simulator.py --target 192.168.1.100 --intensity high --duration 600
```

Since we are running the honeypot as well as the simulator on the same machine locally, the target will be `localhost`. But it can be something else in a real scenario or if you are running the honeypot in a VM or a different machine – so make sure you confirm the IP before running the simulator.

---

## How to Analyze Honeypot Data

Let’s quickly write a helper function that will allow us to analyze all the data collected by the Honeypot. Since we’ve stored this in a JSON log file, we can conveniently parse it using the built-in JSON package.

```py :collapsed-lines
import datetime
import json

def analyze_logs(log_file):
    """Enhanced honeypot log analysis with temporal and behavioral patterns"""
    ip_analysis = {}
    port_analysis = {}
    hourly_attacks = {}
    data_patterns = {}

    # Track session patterns
    ip_sessions = {}
    attack_timeline = []

    with open(log_file, 'r') as f:
        for line in f:
            try:
                activity = json.loads(line)
                timestamp = datetime.datetime.fromisoformat(activity['timestamp'])
                ip = activity['remote_ip']
                port = activity['port']
                data = activity['data']

                # Initialize IP tracking if new
                if ip not in ip_analysis:
                    ip_analysis[ip] = {
                        'total_attempts': 0,
                        'first_seen': timestamp,
                        'last_seen': timestamp,
                        'targeted_ports': set(),
                        'unique_payloads': set(),
                        'session_count': 0
                    }

                # Update IP statistics
                ip_analysis[ip]['total_attempts'] += 1
                ip_analysis[ip]['last_seen'] = timestamp
                ip_analysis[ip]['targeted_ports'].add(port)
                ip_analysis[ip]['unique_payloads'].add(data.strip())

                # Track hourly patterns
                hour = timestamp.hour
                hourly_attacks[hour] = hourly_attacks.get(hour, 0) + 1

                # Analyze port targeting patterns
                if port not in port_analysis:
                    port_analysis[port] = {
                        'total_attempts': 0,
                        'unique_ips': set(),
                        'unique_payloads': set()
                    }
                port_analysis[port]['total_attempts'] += 1
                port_analysis[port]['unique_ips'].add(ip)
                port_analysis[port]['unique_payloads'].add(data.strip())

                # Track payload patterns
                if data.strip():
                    data_patterns[data.strip()] = data_patterns.get(data.strip(), 0) + 1

                # Track attack timeline
                attack_timeline.append({
                    'timestamp': timestamp,
                    'ip': ip,
                    'port': port
                })

            except (json.JSONDecodeError, KeyError) as e:
                continue

    # Analysis Report Generation
    print("\n=== Honeypot Analysis Report ===")

    # 1. IP-based Analysis
    print("\nTop 10 Most Active IPs:")
    sorted_ips = sorted(ip_analysis.items(), 
                       key=lambda x: x[1]['total_attempts'], 
                       reverse=True)[:10]
    for ip, stats in sorted_ips:
        duration = stats['last_seen'] - stats['first_seen']
        print(f"\nIP: {ip}")
        print(f"Total Attempts: {stats['total_attempts']}")
        print(f"Active Duration: {duration}")
        print(f"Unique Ports Targeted: {len(stats['targeted_ports'])}")
        print(f"Unique Payloads: {len(stats['unique_payloads'])}")

    # 2. Port Analysis
    print("\nPort Targeting Analysis:")
    sorted_ports = sorted(port_analysis.items(),
                         key=lambda x: x[1]['total_attempts'],
                         reverse=True)
    for port, stats in sorted_ports:
        print(f"\nPort {port}:")
        print(f"Total Attempts: {stats['total_attempts']}")
        print(f"Unique Attackers: {len(stats['unique_ips'])}")
        print(f"Unique Payloads: {len(stats['unique_payloads'])}")

    # 3. Temporal Analysis
    print("\nHourly Attack Distribution:")
    for hour in sorted(hourly_attacks.keys()):
        print(f"Hour {hour:02d}: {hourly_attacks[hour]} attempts")

    # 4. Attack Sophistication Analysis
    print("\nAttacker Sophistication Analysis:")
    for ip, stats in sorted_ips:
        sophistication_score = (
            len(stats['targeted_ports']) * 0.4 +  # Port diversity
            len(stats['unique_payloads']) * 0.6   # Payload diversity
        )
        print(f"IP {ip}: Sophistication Score {sophistication_score:.2f}")

    # 5. Common Payload Patterns
    print("\nTop 10 Most Common Payloads:")
    sorted_payloads = sorted(data_patterns.items(),
                            key=lambda x: x[1],
                            reverse=True)[:10]
    for payload, count in sorted_payloads:
        if len(payload) > 50:  # Truncate long payloads
            payload = payload[:50] + "..."
        print(f"Count {count}: {payload}")
```

You can place this in a separate script file and call the function on the JSON logs. This function will provide us comprehensive insights from the JSON file based on the data collected.

Our analysis begins by grouping the data into several categories like IP-based statistics, port targeting patterns, hourly attack distributions, and payload characteristics. For every IP, we are tracking total attempts, first and last seen times, targeted ports and unique payloads. This will help us build unique profiles for attackers.

We also examine port-based attack patterns here that monitor for most frequently targeted ports, and by how many unique attackers. We also perform an attack sophistication analysis that helps us identify targeted attackers, considering factors like ports targeted and unique payloads used. This analysis is used for separating simple scanning activities and sophisticated attacks.

Temporal analysis helps us to identify patterns in hourly attack attempts revealing patterns in attack timing and potential automated targeting campaigns. Finally, we publish commonly seen payloads to identify commonly seen attack strings or commands.

---

## Security Considerations

While deploying this honeypot, make sure you consider the following security measures:

1. Run your honeypot in an isolated environment. Typically inside a VM, or on your local machine that is behind a NAT and a firewall.
2. Run the honeypot with minimal system privileges (typically not as root) to reduce risk if compromised.
3. Be cautious with collected data if you plan to ever deploy it as a production-grade or research honeypot as it may contain malware or sensitive information.
4. Implement robust monitoring mechanisms to detect attempts to break out of the honeypot environment.

---

## Conclusion

With this we have built our honeypot, written a simulator to simulate attacks for our honeypot and analyzed the data from our honeypot logs to make a few simple inferences. It is an excellent way to understand both offensive as well as defensive security concepts. You can consider building upon this to create more complex detection systems and think of adding features like:

1. Dynamic service emulation based on attack behavior
2. Integration with threat intelligence systems that will perform better inference analysis of these collected honeypot logs
3. Gather even comprehensive logs beyond the IP, port and network data through advanced logging mechanisms
4. Add machine learning capabilities to detect attack patterns

Remember that even though honeypots are powerful security tools, they should be a part of a comprehensive defensive security strategy, not the only line of defense.

I hope you learnt about how honeypots work, what is their purpose as well as a bit of Python programming as well!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Honeypot in Python: A Practical Guide to Security Deception",
  "desc": "In cybersecurity, a honeypot is a decoy system that’s designed to attract and then detect potential attackers attempting to compromise the system. Just like a pot of honey sitting out in the open would attract flies. Think of these honeypots as secur...",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/build-a-honeypot-with-python.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
