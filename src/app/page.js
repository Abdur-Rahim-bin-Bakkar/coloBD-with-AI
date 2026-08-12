import { Button, CardContent, CardHeader, CardRoot, CardTitle } from "@heroui/react";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 font-sans">
      <CardRoot className="max-w-md">
        <CardHeader>
          <CardTitle>coloBD Frontend</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/60">
            Next.js + Tailwind CSS v4 + HeroUI v3 + Better Auth + MongoDB are
            ready to go.
          </p>
          <Button color="primary" className="mt-4">
            HeroUI Button
          </Button>
        </CardContent>
      </CardRoot>
    </div>
  );
}