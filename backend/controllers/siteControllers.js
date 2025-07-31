import { json } from "express";
import BlockedSite from "../models/BlockedSite.js"

export const addBlockedSite = async (req,res) => {
    const { url } = req.body;
    console.log(url)
    try {
        const site = await BlockedSite.create({ user:req.user.id, url });
        res.status(201).json({ site });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getBlockedSites = async (req, res) => {
  try {
    const sites = await BlockedSite.find({ user: req.user.id });
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeBlockedSite = async (req, res) => {
  try {
    const site = await BlockedSite.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!site) return res.status(404).json({ message: 'Site not found' });
    res.json({ message: 'Site removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};