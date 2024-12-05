import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function KeywordFilters() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Campaign" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Campaigns</SelectItem>
          <SelectItem value="search">Search Campaign</SelectItem>
          <SelectItem value="display">Display Campaign</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Target Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Countries</SelectItem>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue placeholder="Keyword" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Keywords</SelectItem>
          <SelectItem value="brand">Brand Keywords</SelectItem>
          <SelectItem value="non-brand">Non-Brand Keywords</SelectItem>
        </SelectContent>
      </Select>

      <Input placeholder="Search keywords..." className="h-10" />
    </div>
  );
}