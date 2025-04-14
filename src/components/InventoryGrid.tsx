import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Interface
interface InventoryItem {
  id: string;
  product_name: string;
  sku: string;
  quantity: number;
  retail_price: number;
  wholesale_price: number;
  cogs: number;
  business_unit: string;
}

// Margin logic
function getProfitStatus(retail: number, cogs: number): {
  label: string;
  className: string;
  margin: number;
} {
  const margin = retail > 0 ? ((retail - cogs) / retail) * 100 : 0;

  if (margin >= 50) {
    return { label: "Profitable", className: "bg-green-100 text-green-800", margin };
  } else if (margin >= 20) {
    return { label: "Low Margin", className: "bg-yellow-100 text-yellow-800", margin };
  } else {
    return { label: "Unprofitable", className: "bg-red-100 text-red-800", margin };
  }
}

export default function InventoryGrid() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Profitable" | "Low Margin" | "Unprofitable">("All");
  const [editCell, setEditCell] = useState<{ id: string; field: keyof InventoryItem } | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => {
    const fetchInventory = async () => {
      const { data, error } = await supabase.from("inventory").select("*");
      if (error) console.error("Error fetching inventory:", error);
      else setItems(data);
      setLoading(false);
    };
    fetchInventory();
  }, []);

  const handleCellClick = (id: string, field: keyof InventoryItem, value: number) => {
    setEditCell({ id, field });
    setEditValue(value.toString());
  };

  const saveEdit = async () => {
    if (!editCell) return;
    const { id, field } = editCell;
    const updatedValue = parseFloat(editValue);

    const { error } = await supabase
      .from("inventory")
      .update({ [field]: updatedValue })
      .eq("id", id);

    if (error) {
      console.error("Update failed:", error);
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: updatedValue } : item
      )
    );

    setEditCell(null);
    setEditValue("");
  };

  if (loading) return <p className="text-sm text-gray-500">Loading inventory...</p>;

  return (
    <div className="overflow-x-auto border rounded-md bg-white shadow-md p-4">
      {/* Filter bar */}
      <div className="flex gap-2 mb-4">
        {["All", "Profitable", "Low Margin", "Unprofitable"].map(option => (
          <button
            key={option}
            onClick={() => setFilter(option as typeof filter)}
            className={`px-3 py-1 rounded-full text-sm font-medium border ${
              filter === option ? "bg-black text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="table-auto w-full text-sm">
        <thead className="bg-gray-100 text-left sticky top-0 z-10 shadow-sm">
          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">SKU</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Retail</th>
            <th className="p-2">Wholesale</th>
            <th className="p-2">COGS</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Profitability</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter(item => {
              const { label } = getProfitStatus(item.retail_price, item.cogs);
              return filter === "All" || label === filter;
            })
            .map((item, index) => {
              const { label, className, margin } = getProfitStatus(item.retail_price, item.cogs);

              return (
                <tr
                  key={item.id}
                  className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="p-2">{item.product_name}</td>
                  <td className="p-2">{item.sku}</td>
                  <td className="p-2">{item.quantity}</td>

                  {/* Editable Retail */}
                  <td
                    className="p-2 text-right cursor-pointer"
                    onClick={() => handleCellClick(item.id, "retail_price", item.retail_price)}
                  >
                    {editCell?.id === item.id && editCell.field === "retail_price" ? (
                      <input
                        type="number"
                        className="w-20 p-1 border rounded text-right"
                        value={editValue}
                        autoFocus
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      />
                    ) : (
                      `$${item.retail_price.toFixed(2)}`
                    )}
                  </td>

                  <td className="p-2 text-right">${item.wholesale_price.toFixed(2)}</td>

                  {/* Editable COGS */}
                  <td
                    className="p-2 text-right cursor-pointer"
                    onClick={() => handleCellClick(item.id, "cogs", item.cogs)}
                  >
                    {editCell?.id === item.id && editCell.field === "cogs" ? (
                      <input
                        type="number"
                        className="w-20 p-1 border rounded text-right"
                        value={editValue}
                        autoFocus
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                      />
                    ) : (
                      `$${item.cogs.toFixed(2)}`
                    )}
                  </td>

                  <td className="p-2">{item.business_unit}</td>

                  <td className="p-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${className}`}>
                      {label} • {margin.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div
