## Plugin Definitions

### Manifest

```json
{
  "title": "Showcase",
  "src": "https://e6fa-2a02-4e0-2d7d-c8d-5883-39e8-b0d6-c31d.ngrok-free.app/",
  "uiDefinition": {
    "height": 900
  },
  "singleton": false,
  "lazy": true
}
```

### Settings

```json
{
  "bg-color": "orange",
  "text-color": "white"
}
```

## Testing the Application

To test the application within Grispi, simply run the following command:

```sh
yarn start
```

If you want to test outside of Grispi, make sure to comment out the `Grispi.instance()` block in the `contexts/grispi-context.tsx` file.

## Grispi Instance Initialization

The `Grispi.instance()` initialization code is as follows:

```tsx
useEffect(() => {
  Grispi.instance()
    ._init()
    .then((data: GrispiBundle) => {
      setTicket(data.context.ticket);
      setSettings(data.settings);
      setLoading(false);

      Grispi.instance().activeTicketChanged = function (ticket: Ticket) {
        setTicket(ticket);
      };
    })
    .catch((err) => {
      console.error({ err });
    });
}, []);
```

# Sources

- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://shadcn.dev/)
- [Craco](https://github.com/gsoft-inc/craco)
- [Create React App](https://github.com/facebook/create-react-app)
- [React documentation](https://reactjs.org/)
