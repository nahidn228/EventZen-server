import { Note } from "../models/notes.models";
import express, { Request, Response } from "express";

export const notesRoutes = express.Router();

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  //  approach 1 creating a data
  // const myNote = new Note({
  //   title: "Learning Express",
  //   content: "I am learning Mongoose with TS and Express",
  //   tags: {
  //     label: "Database",
  //   },
  // });
  // await myNote.save();

  // approach - 2
  console.log(body);

  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "note created successfully",
    note,
  });
});
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "note created successfully",
    notes,
  });
});
notesRoutes.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const notes = await Note.findById(id);

  res.status(201).json({
    success: true,
    message: "note Find successfully",
    notes,
  });
});
notesRoutes.patch("/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;
  const updateBody = req.body;

  const note = await Note.findByIdAndUpdate(noteId, updateBody, { new: true });
  // const note = await Note.updateOne({ _id: noteId }, updateBody, { new: true });
  // const note = await Note.findOneAndUpdate({ _id: noteId },updateBody, {new: true,});

  res.status(201).json({
    success: true,
    message: "note update successfully",
    note,
  });
});
notesRoutes.delete("/:id", async (req: Request, res: Response) => {
  const noteId = req.params.id;

  const note = await Note.findByIdAndDelete(noteId);
  // const note1 = await Note.deleteOne({ _id: noteId });
  // const note2 = await Note.findOneAndDelete({ _id: noteId });

  res.status(201).json({
    success: true,
    message: "note deleted successfully",
    note,
  });
});
