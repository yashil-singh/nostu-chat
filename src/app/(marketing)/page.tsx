"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full space-y-4 flex flex-col relative">
      <header className="max-w-xl w-full rounded-4xl sticky top-4 h-fit p-3 border-2 mx-auto flex items-center justify-center gap-6 bg-card/20 backdrop-blur-[2px]">
        <div className="flex-1 flex items-center flex-row-reverse gap-2">
          <Link
            href="/features"
            className="hover:text-primary transition-colors"
          >
            Features
          </Link>
        </div>

        <div className="h-10 w-10 shrink-0 object-cover relative">
          <Image alt="logo" src="/logo.png" fill />
        </div>

        <div className="flex-1 flex items-center gap-2">
          <Link href="/signup" className="hover:text-primary transition-colors">
            Join Now
          </Link>
        </div>
      </header>

      <div className="grow container mx-auto flex">
        <section className="w-full h-[calc(100vh-8rem)] grid md:grid-cols-2 gap-12">
          <div className="flex flex-col items-center text-center md:text-right md:items-end justify-center">
            <h1 className="text-3xl md:text-5xl font-bold">
              Welcome to Nostu Chat
            </h1>
            <p className="text-lg text-muted-foreground mt-4">
              Connect with friends and family anytime, anywhere. Experience
              seamless messaging with modern design and powerful features that
              bring people together.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image src="/logo.png" alt="Hero" width={500} height={500} />
          </div>
        </section>
      </div>

      <div className="absolute bottom-12 left-[5%] max-w-sm w-full overflow-hidden h-40">
        <div className="space-y-4">
          {/* Message 1 - disappears when message 4 appears */}
          <motion.div
            className="w-[60%] flex items-end gap-2"
            animate={{
              y: [0, 0, 0, -56],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 8,
              times: [0, 0.5, 0.75, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="size-7 rounded-full bg-primary/20 shrink-0" />
            <div className="rounded-xl bg-primary/20 w-full flex items-center py-2 px-4">
              <p>•••</p>
            </div>
          </motion.div>

          {/* Message 2 - shifts up when new messages appear */}
          <motion.div
            className="w-[60%] flex items-end gap-2 flex-row-reverse mx-auto"
            animate={{
              y: [60, 0, 0, -56],
              opacity: [0, 1, 1, 1],
            }}
            transition={{
              duration: 8,
              times: [0, 0.125, 0.5, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="size-7 rounded-full bg-primary/20 shrink-0" />
            <div className="rounded-xl bg-primary/20 w-full flex items-center py-2 px-4">
              <p>•••</p>
            </div>
          </motion.div>

          {/* Message 3 - shifts up when new messages appear */}
          <motion.div
            className="w-[60%] flex items-end gap-2"
            animate={{
              y: [60, 60, 0, -56],
              opacity: [0, 0, 1, 1],
            }}
            transition={{
              duration: 8,
              times: [0, 0.25, 0.5, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="size-7 rounded-full bg-primary/20 shrink-0" />
            <div className="rounded-xl bg-primary/20 w-full flex items-center py-2 px-4">
              <p>•••</p>
            </div>
          </motion.div>

          {/* Message 4 - appears at bottom, pushes others up */}
          <motion.div
            className="w-[60%] flex items-end gap-2 flex-row-reverse mx-auto"
            animate={{
              y: [60, 60, 60, 0],
              opacity: [0, 0, 0, 1],
            }}
            transition={{
              duration: 8,
              times: [0, 0.5, 0.75, 1],
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div className="size-7 rounded-full bg-primary/20 shrink-0" />
            <div className="rounded-xl bg-primary/20 w-full flex items-center py-2 px-4">
              <p>•••</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
