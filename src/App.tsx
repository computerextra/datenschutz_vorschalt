import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";

function App() {
  const handleClick = async () => {
    // Get MediaInfos
    const infos = new FormData();
    infos.set("UserAgent", navigator.userAgent);
    infos.set("CPU", navigator.hardwareConcurrency.toString());
    infos.set("Lang", navigator.language);

    const config: AxiosRequestConfig = {
      headers: {
        Accept: "application/json",
      } as RawAxiosRequestHeaders,
    };
    const res = await axios.post<{ ok: boolean; error: string | null }>(
      "https://computer-extra.de/php/accept.php",
      infos,
      config
    );

    if (res.data) {
      if (res.data.ok) {
        window.location.replace("https://johanneskirchner.net");
      } else if (res.data.error) {
        alert(res.data.error);
      }
    }
  };
  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-center">Datenschutz Training</h1>
        <h2 className="text-center">
          Der Firmen{" "}
          <span className="font-semibold underline">Computer Extra GmbH</span>{" "}
          und{" "}
          <span className="font-semibold underline">
            AEM Communication GmbH & Co. KG
          </span>
        </h2>
        <p className="text-xl">
          <b>Achtung:</b> Diese Webseite ist ausschließlich für Mitarbeiter der
          Firmen{" "}
          <span className="font-semibold underline">Computer Extra GmbH</span>{" "}
          und{" "}
          <span className="font-semibold underline">
            AEM Communication GmbH & Co. KG
          </span>{" "}
          gedacht.
        </p>

        <p className="text-xl">
          Eine Nutzung der WebApp ohne Anmeldung ist nicht möglich. <br />
          Für die Anmeldung ist zwingend eine Geschäftliche E-Mail Adresse
          notwendig!
        </p>
      </div>
      <div className="container flex flex-col p-4 mx-auto mt-8 border border-black rounded-xl">
        <div className="mb-4 text-center">
          <h1>Verwendung von Cookies</h1>
          <p>
            Um unsere Webseite für Sie optimal zu gestalten und fortlaufend
            verbessern zu können, verwenden wir Cookies. Durch die weitere
            Nutzung der Webseite stimmen Sie der Verwendung von Cookies zu.
          </p>
          <p>
            Weitere Informationen zu Cookies erhalten Sie in unserer{" "}
            <a
              href="https://computer-extra.de/Datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Datenschutzerklärung
            </a>{" "}
            und unserem{" "}
            <a
              href="https://computer-extra.de/Impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Impressum
            </a>
            .
          </p>
          <p className="text-xl underline">
            <b>Info:</b> Beim Zustimmen wird ein Datenbankeintrag erstellt,
            damit der Browser auf der externen Seite erkannt werden kann.
          </p>
        </div>
        <Button onClick={handleClick}>
          Das ist für mich Okay{" "}
          <span className="uppercase">
            (Verlinkt auf Externe Seite (johanneskirchner.net))
          </span>
        </Button>
      </div>
    </>
  );
}

export default App;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
