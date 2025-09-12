---
date: "2021-05-19T22:25:36-03:00"
draft: false
title: "Simple guide of Iptables"
---

## Attention:

> All the operations will be accomplished considering that you’re logged as “root”, or that you’re running the commands with `sudo`, therefore, be careful

## Show the Rules:

First, you’ll need to verify all the rules that you already have. To list all the rules,use the following command:

```bash
iptables -L
```

If you want to see the lines of the rules (this will be important later), you can simply type the following command:

```bash
iptables -L --line-numbers
```

You can see that the output will show all the rules, of all the chains, but,in this tutorial, I will use only the input chain, never the less the commands should work in all the other chains.

The chains are a list of rules processed in order. That’s why it is so important to verify all the other rules in the chain, to see where you’ll have to put new rules that you’re creating, or which one to delete.

## Persist the changes (And backup,of course)

Install the package `iptables-persistent`, so you can save the alterations

```bash
apt install iptables-persistent
```

After the installation, the configuration will be saved in two places: one for the IPV4 rules, and the other one to IPV6 rules.

```bash
/etc/iptables/rules.v4
/etc/iptables/rules.v6
```

Now you can change whatever you desire on Iptables. Here,we’ll open a port as an example.

## Adding a Rule

To open a port, execute the following command, where `your_port` is the port that you want:

```bash
iptables -m comment --comment "New Port" -A INPUT -p tcp --dport your_port -j ACCEPT
```

This will append the rule in the end of the chain (in this case, `INPUT` chain)

## Important!

The rules inserted on Iptables are verified one by one on a sequence, therefore, if needed, use the following command to insert a new rule before any other rule that you want to add:

```bash
iptables -m comment --comment "New Port" -I INPUT line_number -p tcp --dport your_port -j ACCEPT
```

## Delete

The simplest way to delete one rule is by the line number. You can simply specify which line of the chain to delete:

```bash
iptables -D INPUT number_of_the_line
```

After that, you’ll execute the following commands to save the configuration that you’ve done.

To save the IPV4 rules:

```bash
iptables-save > /etc/iptables/rules.v4
```

And to save the IPV6 rules:

```bash
iptables-save> /etc/iptables/rules.v6
```

Now, all your configurations will remain after the reboot. And that’s it!!!

A huge thanks to [Mylena Rossato](https://medium.com/u/b4c09758a45?source=post_page---user_mention--ae10387ec075---------------------------------------) for helping me translate this guide!!!.
