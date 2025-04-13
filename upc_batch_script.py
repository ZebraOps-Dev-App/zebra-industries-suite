
import requests
import pandas as pd
import time

api_key = "YOUR_UPCITEMDB_API_KEY"  # Replace with your real key

upcs = [
    "43608058279", "X004AQRF3B", "57363782574", "37370689531", "76523275971",
    "X002ODA6ZB", "771801631987", "52011145484", "81355055054", "49331432057",
    "11402093273", "74404939235", "54602704298", "70144889067", "30252478337",
    "22808057282", "10216385084", "56677930190", "19157123634", "53675399462",
    "97070666552", "64347835322", "64173559136", "46755067277"
]

results = []

for upc in upcs:
    try:
        url = f"https://api.upcitemdb.com/prod/trial/lookup?upc={upc}"
        headers = {"Accept": "application/json", "user_key": api_key}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        if 'items' in data and data['items']:
            item = data['items'][0]
            results.append({
                "upc": upc,
                "title": item.get("title", "N/A"),
                "brand": item.get("brand", "N/A"),
                "description": item.get("description", "N/A"),
                "category": item.get("category", "N/A"),
                "image_url": item.get("images", [""])[0] if item.get("images") else ""
            })
        else:
            results.append({"upc": upc, "title": "No Data Found"})
    except Exception as e:
        results.append({"upc": upc, "title": f"Error: {e}"})
    time.sleep(1)

df = pd.DataFrame(results)
df.to_csv("C:\\Users\\cynth\\Desktop\\upc_results.csv", index=False)
print("✅ UPC Lookup Complete. Results saved as upc_results.csv on your Desktop.")
