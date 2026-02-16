import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { COLORS, MATERIALS } from '@/lib/constants/filter';
import {
  DocumentHandle,
  useDocument,
  useEditDocument,
} from '@sanity/sdk-react';

// Field editor components
function NameEditor(handle: DocumentHandle) {
  const { data: name } = useDocument({ ...handle, path: 'name' });
  const editName = useEditDocument({ ...handle, path: 'name' });

  return (
    <Input
      value={(name as string) ?? ''}
      onChange={(e) => editName(e.target.value)}
      placeholder="Product name"
    />
  );
}

function SlugEditor(handle: DocumentHandle) {
  const { data: slug } = useDocument({ ...handle, path: 'slug' });
  const editSlug = useEditDocument({ ...handle, path: 'slug' });
  const slugValue = (slug as { current?: string })?.current ?? '';

  return (
    <Input
      value={slugValue}
      onChange={(e) => editSlug({ _type: 'slug', current: e.target.value })}
      placeholder="product-slug"
    />
  );
}

function DescriptionEditor(handle: DocumentHandle) {
  const { data: description } = useDocument({ ...handle, path: 'description' });
  const editDescription = useEditDocument({ ...handle, path: 'description' });

  return (
    <Textarea
      value={(description as string) ?? ''}
      onChange={(e) => editDescription(e.target.value)}
      placeholder="Product description..."
      rows={4}
    />
  );
}

function PriceEditor(handle: DocumentHandle) {
  const { data: price } = useDocument({ ...handle, path: 'price' });
  const editPrice = useEditDocument({ ...handle, path: 'price' });

  return (
    <Input
      type="number"
      step="0.01"
      min="0"
      value={(price as number) ?? ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        editPrice(parseFloat(e.target.value) || 0)
      }
      placeholder="0.00"
    />
  );
}

function StockEditor(handle: DocumentHandle) {
  const { data: stock } = useDocument({ ...handle, path: 'stock' });
  const editStock = useEditDocument({ ...handle, path: 'stock' });

  return (
    <Input
      type="number"
      min="0"
      value={(stock as number) ?? 0}
      onChange={(e) => editStock(parseInt(e.target.value) || 0)}
      placeholder="0"
    />
  );
}

function MaterialEditor(handle: DocumentHandle) {
  const { data: material } = useDocument({ ...handle, path: 'material' });
  const editMaterial = useEditDocument({ ...handle, path: 'material' });

  return (
    <Select
      value={(material as string) ?? ''}
      onValueChange={(value) => editMaterial(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select material" />
      </SelectTrigger>
      <SelectContent>
        {MATERIALS.map((m) => (
          <SelectItem key={m.value} value={m.value}>
            {m.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ColorEditor(handle: DocumentHandle) {
  const { data: color } = useDocument({ ...handle, path: 'color' });
  const editColor = useEditDocument({ ...handle, path: 'color' });

  return (
    <Select
      value={(color as string) ?? ''}
      onValueChange={(value) => editColor(value)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select color" />
      </SelectTrigger>
      <SelectContent>
        {COLORS.map((c) => (
          <SelectItem key={c.value} value={c.value}>
            {c.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DimensionsEditor(handle: DocumentHandle) {
  const { data: dimensions } = useDocument({ ...handle, path: 'dimensions' });
  const editDimensions = useEditDocument({ ...handle, path: 'dimensions' });

  return (
    <Input
      value={(dimensions as string) ?? ''}
      onChange={(e) => editDimensions(e.target.value)}
      placeholder='e.g., "120cm x 80cm x 75cm"'
    />
  );
}

function FeaturedEditor(handle: DocumentHandle) {
  const { data: featured } = useDocument({ ...handle, path: 'featured' });
  const editFeatured = useEditDocument({ ...handle, path: 'featured' });

  return (
    <Switch
      checked={(featured as boolean) ?? false}
      onCheckedChange={(checked: boolean) => editFeatured(checked)}
    />
  );
}
function AssemblyEditor(handle: DocumentHandle) {
  const { data: assemblyRequired } = useDocument({
    ...handle,
    path: 'assemblyRequired',
  });
  const editAssembly = useEditDocument({
    ...handle,
    path: 'assemblyRequired',
  });

  return (
    <Switch
      checked={(assemblyRequired as boolean) ?? false}
      onCheckedChange={(checked: boolean) => editAssembly(checked)}
    />
  );
}

export {
  NameEditor,
  SlugEditor,
  DescriptionEditor,
  PriceEditor,
  StockEditor,
  MaterialEditor,
  ColorEditor,
  DimensionsEditor,
  FeaturedEditor,
  AssemblyEditor,
};
