// components/docs/block-mini.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Markdown from "react-markdown";
import { FaPlay, FaXmark } from "react-icons/fa6";
import { DocBlock } from "@/lib/client/types";

export function BlockMini({ block }: { block: DocBlock }) {
  const { kind, title, props } = block;

  // Håndter article type (nyt fra doc_items)
  if (kind === "article") {
    return (
      <div className="prose max-w-none">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {props?.content && <Markdown>{props.content}</Markdown>}
        {props?.excerpt && !props?.content && (
          <p className="text-gray-600">{props.excerpt}</p>
        )}
      </div>
    );
  }

  // Håndter link type (nyt fra doc_items)
  if (kind === "link") {
    return (
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {props?.external_url && (
          <a
            href={props.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Åbn link →
          </a>
        )}
      </div>
    );
  }

  if (kind === "rich_text") {
    return (
      <div className="prose max-w-none">
        <Markdown>{props?.content ?? ""}</Markdown>
      </div>
    );
  }

  if (kind === "list") {
    const Tag: any = props?.ordered ? "ol" : "ul";
    return (
      <Tag
        className={`${
          props?.ordered ? "list-decimal" : "list-disc"
        } list-inside space-y-2`}
      >
        {(props?.items ?? []).map((x: string, i: number) => (
          <li key={i}>{x}</li>
        ))}
      </Tag>
    );
  }

  if (kind === "card") {
    return (
      <div className="mt-4 p-4 bg-base-100 rounded-lg shadow-md border border-base-300">
        <p className="text-sm">{props?.text ?? ""}</p>
      </div>
    );
  }

  if (kind === "embed" && props?.type === "video") {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        {!open ? (
          <button
            onClick={() => setOpen(true)}
            className="relative w-full max-w-lg overflow-hidden rounded-lg group"
          >
            <Image
              src={props?.poster ?? "/thumbnail.png"}
              alt={title ?? "Video"}
              width={855}
              height={481}
              className="w-full h-auto block rounded-lg transition-transform group-hover:scale-101"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-all">
              <div className="bg-base-100 bg-opacity-90 rounded-2xl p-3 md:p-5 shadow-lg group-hover:bg-opacity-100 transition-all">
                <FaPlay className="text-xl md:text-3xl text-primary ml-1" />
              </div>
            </div>
          </button>
        ) : (
          <video
            controls
            autoPlay
            className="w-full h-full rounded-lg"
            poster={props?.poster ?? "/thumbnail.png"}
          >
            <source src={props?.src} type="video/mp4" />
          </video>
        )}
      </div>
    );
  }

  return null;
}
