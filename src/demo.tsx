import { useMemo, useState } from "react";
import { Input } from "./components/input/input";
import styles from "./demo.module.css";
import generate, { PaginationConfig } from "pagination-schema";
import { Button } from "./components/button/button";
import clsx from "clsx";

export const Demo = () => {
  const [config, setConfig] = useState<PaginationConfig>({
    total: 100,
    perPage: 10,
    currentPage: 1,
    autoCalibrate: true,
  });

  const [selectedKey, setSelectedKey] = useState<
    keyof PaginationConfig | (string & {})
  >();

  const pagination = useMemo(() => generate(config), [config]);

  const configAttributes = useMemo<
    Record<
      keyof PaginationConfig,
      {
        key: keyof PaginationConfig;
        title: string;
        description: string;
        type: "number" | "checkbox";
      }
    >
  >(
    () => ({
      total: {
        key: "total",
        title: "Total",
        description:
          "Indicates the total records in your database or your dataset",
        type: "number",
      },
      perPage: {
        key: "perPage",
        title: "Per page",
        description: "Indicates the amount of items you want show per page",
        type: "number",
      },
      currentPage: {
        key: "currentPage",
        title: "Current page",
        description: "Indicates the current showed page",
        type: "number",
      },
      boundaryCount: {
        key: "boundaryCount",
        title: "Boundary count",
        description:
          "Indicates how many pages show at the start and end of your pagination structure",
        type: "number",
      },
      siblingCount: {
        key: "siblingCount",
        title: "Sibling count",
        description:
          "Indicates how many pages show at the sides of your current page structure",
        type: "number",
      },
      autoCalibrate: {
        key: "autoCalibrate",
        title: "Auto calibrate",
        description:
          "Mutates the original output array to have always the same length to prevent UI flickering",
        type: "checkbox",
      },
    }),
    []
  );

  const selectedConfig = useMemo(
    () =>
      selectedKey
        ? configAttributes[selectedKey as keyof PaginationConfig]
        : undefined,
    [selectedKey, configAttributes]
  );

  return (
    <main className={styles.demo}>
      <h1 className={styles.title}>
        Pagination Schema 📄
        <p className={styles.description}>
          Useful and easy helper to create pagination components out of the box
        </p>
      </h1>

      <section className={styles.controls}>
        {Object.entries(configAttributes).map(([key, attributes]) => (
          <div className={styles.control} key={attributes.title}>
            <span>
              {attributes.title}
              <div
                className={clsx(
                  styles.circle,
                  selectedKey === key && styles.selected
                )}
                onClick={() =>
                  setSelectedKey((prevKey) =>
                    prevKey === key ? undefined : key
                  )
                }
              >
                i
              </div>
            </span>
            <Input
              type={attributes.type}
              placeholder={attributes.type === "number" ? "0" : ""}
              style={attributes.type === "checkbox" ? { width: 14 } : {}}
              value={
                attributes.type === "number"
                  ? ((config[key as keyof PaginationConfig] ?? "") as string)
                  : undefined
              }
              checked={
                attributes.type === "checkbox"
                  ? (config[key as keyof PaginationConfig] as boolean)
                  : undefined
              }
              onChange={({ currentTarget }) =>
                setConfig((config) => ({
                  ...config,
                  [key]:
                    attributes.type === "number"
                      ? currentTarget.value !== ""
                        ? +currentTarget.value
                        : undefined
                      : currentTarget.checked,
                }))
              }
            />
          </div>
        ))}
      </section>
      {selectedConfig && (
        <section className={styles.info}>
          <h2>
            {selectedConfig.title}{" "}
            <code
              style={{ fontSize: 12, fontWeight: "bold" }}
            >{`{${selectedConfig.key}}`}</code>
          </h2>
          <p className={styles.description}>{selectedConfig.description}</p>
        </section>
      )}
      <section className={styles.viewport}>
        <div className={styles.label}>Output array:</div>
        <div className={styles.pagination}>
          {pagination.map((page, index) => (
            <Button key={`${page}-${index}`} variant="tertiary">
              {page}
            </Button>
          ))}
        </div>
        <div className={styles.label}>Becomes 👇🏻</div>
        <div className={styles.pagination}>
          {pagination.map((page, index) => (
            <Button
              key={`${page}-${index}`}
              variant={
                page === config.currentPage
                  ? "primary"
                  : page === 0
                  ? "tertiary"
                  : "secondary"
              }
              onClick={() =>
                setConfig((config) => ({ ...config, currentPage: page }))
              }
              disabled={page === 0}
            >
              {page !== 0 ? page : "..."}
            </Button>
          ))}
        </div>
        <p
          className={styles.description}
          style={{ paddingTop: 8, fontSize: 10, textAlign: "center" }}
        >
          You are free to build your own component styles and interactions
        </p>
      </section>
      <section className={clsx(styles.footer, styles.description)}>
        Made with ❤️ by Angel
        <div className={styles.description}>
          checkout this{" "}
          <a
            className={styles.description}
            href="https://github.com/Angel-Ponce/pagination-schema"
            target="_blank"
          >
            repo
          </a>
        </div>
      </section>
    </main>
  );
};
