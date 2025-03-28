import { useEffect, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";

const Colors = ["red", "orange", "yellow", "purple", "blue", "green"] as const;
type Color = (typeof Colors)[number];

type Item = {
  label: string;
  color: Color;
};

const baseItems: Item[] = [
  { label: "Apple", color: "red" },
  { label: "Orange", color: "orange" },
  { label: "Banana", color: "yellow" },
  { label: "Grape", color: "purple" },
  { label: "Lemon", color: "yellow" },
  { label: "Blueberry", color: "blue" },
  { label: "Kiwi", color: "green" },
  { label: "Watermelon", color: "green" },
  { label: "Strawberry", color: "red" },
  { label: "Peach", color: "orange" },
];

const SortOptions = {
  AZ: "A-Z",
  ZA: "Z-A",
} as const;
type SortOptions = (typeof SortOptions)[keyof typeof SortOptions];

const SortFilterSearchList = () => {
  const [query, setQuery] = useState("");
  const [colorFilter, setColorFilter] = useState<Color | "">("");
  const [selectedSort, setSelectedSort] = useState<SortOptions>(SortOptions.AZ);
  const [took, setTook] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(10);
  const items = useMemo(() => {
    return Array.from({ length: numberOfItems }, (_, i) => {
      const item = baseItems[i % baseItems.length];
      return {
        label: `${item.label} #${i + 1}`, // Make each label unique
        color: item.color,
      };
    });
  }, [numberOfItems]);

  const [processedItems, setProcessedItems] = useState<typeof items>(items);

  useEffect(() => {
    const start = performance.now();
    let nextItems = items;

    if (colorFilter) {
      nextItems = nextItems.filter((item) => colorFilter === item.color);
    }

    if (query) {
      nextItems = nextItems.filter((item) => {
        return item.label.includes(query);
      });
    }
    if (selectedSort === SortOptions.AZ) {
      nextItems = nextItems.sort((a, b) => a.label.localeCompare(b.label));
    } else if (selectedSort === SortOptions.ZA) {
      nextItems = nextItems.sort((a, b) => b.label.localeCompare(a.label));
    }

    const diff = performance.now() - start;
    setTook(diff);
    setProcessedItems(nextItems);
  }, [items, query, colorFilter, selectedSort]);

  return (
    <div className="rounded-lg border border-gray-300 border-solid p-2">
      <p>Time Taken: {took}ms</p>
      <div>
        <label htmlFor="number-of-items">Number of Items</label>
        <select
          style={{ color: "black" }}
          name="number-of-items"
          value={numberOfItems}
          onChange={(e) => setNumberOfItems(parseInt(e.currentTarget.value))}
        >
          {[10, 100, 1000, 10_000, 100_000, 1_000_000].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 justify-between flex-wrap">
        <div className="flex gap-1">
          <label htmlFor="search">Search</label>
          <input
            name="search"
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            style={{ color: "black" }}
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="filter-color">Filter by Color</label>
          <select
            style={{ color: "black" }}
            name="filter-color"
            value={colorFilter}
            onChange={(e) => {
              setColorFilter(e.currentTarget.value as Color | "");
            }}
          >
            <option value="">--Select--</option>
            {Colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-1">
          <label htmlFor="sort">Sort by</label>
          <select
            style={{ color: "black" }}
            name="sort"
            value={selectedSort}
            onChange={(e) => {
              setSelectedSort(e.currentTarget.value as SortOptions);
            }}
          >
            {Object.values(SortOptions).map((sortOption) => (
              <option key={sortOption} value={sortOption}>
                {sortOption}
              </option>
            ))}
          </select>
        </div>
      </div>
      <List
        height={200}
        width={264}
        itemCount={processedItems.length}
        itemSize={40}
        itemData={processedItems}
        itemKey={idx => processedItems[idx].label}
      >
        {({ index, style, data }) => (
          <div
            style={{
              ...style,
              backgroundColor: data[index].color,
              color: "black",
            }}
          >
            {data[index].label}
          </div>
        )}
      </List>
    </div>
  );
};

export default SortFilterSearchList;
